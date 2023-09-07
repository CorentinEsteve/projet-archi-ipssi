import React, { useContext, useEffect, useState } from 'react'
import "./CustomerFilesPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import DownloadSvg from '../../../assets/svg/DownloadSvg';
import useFetchFiles from '../../../utils/hooks/useFetchFiles';
import useFetch from '../../../utils/hooks/useFetch';
import BackComponent from '../../../components/BackComponent/BackComponent';
import pageRedirection from '../../../utils/functions/pageRedirection';
import upArrow from "../../../assets/up-arrow.svg";
import downArrow from "../../../assets/down-arrow.svg";

const CustomerFilesPage = () => {

    const location = useLocation();
    const folderId = location.state.folderInfo._id;
    const navigate = useNavigate();

    const [files, setFiles] = useFetchFiles(folderId);
    const {user, setUser} = useContext(UserContext);
    const [filesFiltered, setFilesFiltered] = useState<Array<any>>([]);
    const [isFilesFilteredByAscendingDate, setIsFilesFilteredByAscendingDate] = useState(true);
    const [isFilesFilteredByAscendingWeight, setIsFilesFilteredByAscendingWeight] = useState(true);
    const [messageNewFileAdded, setMessageNewFileAdded] = useState<string>();
    const [focusLink, setFocusLink] = useState("")

    

    console.log("files filtered inital", filesFiltered);

    const [fileFormData, setFileFormData] = useState<any>({});

      function handleFile(event:any){
        setFileFormData({...fileFormData, "file" : event.target.files[0]});
      }

      function handleInput(e:any){
        setFileFormData({...fileFormData, [e.target.name] : e.target.value});
      }  

      const HandleUpload = async(e:any) => {

        const formData = new FormData();

        formData.set("file",fileFormData.file);
        formData.set("fileLabel",fileFormData.fileLabel);
        formData.set("userId",user._id);
        formData.set("folderId",folderId);

        const url = "http://localhost:3350/api/v1/files";

        const datas = await useFetch("POST",url, formData, false);
        
        if(datas){
          const userUpdated = datas.userUpdated;
          localStorage.setItem("currentUser", JSON.stringify(userUpdated));
          setFiles([...files, datas.file]);
          setUser(userUpdated);
          setMessageNewFileAdded("Nouveau fichier ajouté !");
        }
      }

      const DeleteFile = async(fileId: string, userId: string, fileSizeMb: number, folderId: string) => {

        const body = JSON.stringify({userId, fileId, fileSizeMb, folderId});

        const url = "http://localhost:3350/api/v1/files"
  
        const {userUpdated, newFilesList} = await useFetch("DELETE",url,body);

        setUser(userUpdated);
        setFiles(newFilesList);
        localStorage.setItem("currentUser",JSON.stringify(userUpdated));
    }

    function SortByDate(){
      setFocusLink("focusDate");

      if(isFilesFilteredByAscendingDate){

        const sortedArray = [...files].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscendingDate(!isFilesFilteredByAscendingDate);
      }else {
        
        const sortedArray = [...files].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscendingDate(!isFilesFilteredByAscendingDate);
      }
    }

    function SortByWeight(){
      setFocusLink("focusWeight");

      if(isFilesFilteredByAscendingWeight){
        
        const sortedArray = [...files].sort((a, b) => a.fileSizeMb - b.fileSizeMb);
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscendingWeight(!isFilesFilteredByAscendingWeight);
      }else {
        
        const sortedArray = [...files].sort((a, b) => b.fileSizeMb - a.fileSizeMb);
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscendingWeight(!isFilesFilteredByAscendingWeight);
      }
    }

    function SortByFileType(fileType: string){

      console.log("filetype", fileType);

      if(fileType == "image/png"){
        setFocusLink("focusPng");
      }
      if(fileType == "image/jpeg"){
        setFocusLink("focusJpg");
      }
      if(fileType == "application/pdf"){
        setFocusLink("focusPdf");
      }

      const sortedArray = [...files].filter((element) => element.fileType === fileType);

      setFilesFiltered(sortedArray)
    }

    function SearchFiles(e:any){

      const filesFound = [...files].filter(({fileLabel}) => fileLabel.includes(e.target.value.toLowerCase()));
      setFilesFiltered(filesFound);
    }

    const displayFiles = filesFiltered.length > 0 ? filesFiltered : files;
 
      return (
          <div className='MyFilesSection'>
            <BackComponent onClick={() => pageRedirection("/customerDashboard/folders",{},navigate)} />
            <div className='MyFilesSection__header'>
              <p className='MyFilesSection__header--title'> Mes fichiers</p> 
              <input type="text" placeholder=' Rechercher un fichier' onChange={SearchFiles} />
              <AlertComponent title='Ajouter un fichier' buttonText='Ajouter un fichier' agreeOnClick={HandleUpload}>
                <TextField type='text' placeholder=' Nom du fichier' name='fileLabel' onChange={handleInput}/>
                <TextField type='file' name='file' onChange={handleFile}/>
              </AlertComponent>
            </div>
            <div className='MyFilesSection__filters'>
              <div className={`${focusLink == "focusDate" && "focusColor"}`} onClick={SortByDate}>Ordonner par dates {isFilesFilteredByAscendingDate ?<img src={upArrow} alt="up arrow" /> : <img src={downArrow} alt='down arrow' />}</div>
              <div className={`${focusLink == "focusWeight" && "focusColor"}`} onClick={SortByWeight}>Ordonner par poids {isFilesFilteredByAscendingWeight ?<img src={upArrow} alt="up arrow" /> : <img src={downArrow} alt='down arrow' />}</div>
              <div className={`${focusLink == "focusPng" && "focusColor"}`} onClick={() => SortByFileType("image/png")}>png</div>
              <div className={`${focusLink == "focusJpg" && "focusColor"}`} onClick={() => SortByFileType("image/jpeg")}>jpg</div>
              <div className={`${focusLink == "focusPdf" && "focusColor"}`} onClick={() => SortByFileType("application/pdf")}>pdf</div>
            </div>
            <span className='MyFilesSection__messageNewFolderAdded'>{messageNewFileAdded}</span>
            <div className='MyFilesSection__fileList'>
            {
              displayFiles.map(({fileLabel, _id, filePath, userId, fileSizeMb, folderId, fileName}, index) =>
                <ItemComponent key={index} isFolderItem={false} buttonText={fileLabel} agreeOnClick={() => DeleteFile(_id,userId,fileSizeMb,folderId)} clickOnItem={() => {}} ><DownloadSvg fileLabel={fileName} href={filePath}/> </ItemComponent>
                )
            }
            </div>
          </div>
  )
}

export default CustomerFilesPage
import React, { useContext, useEffect, useState } from 'react'
import "./CustomerFilesPage.scss";
import { useLocation } from "react-router-dom";
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import DownloadSvg from '../../../assets/svg/DownloadSvg';
import useFetchFiles from '../../../utils/hooks/useFetchFiles';
import useFetch from '../../../utils/hooks/useFetch';

const CustomerFilesPage = () => {

    const location = useLocation();
    const folderId = location.state.folderInfo._id;

    const [files, setFiles] = useFetchFiles(folderId);
    const {user, setUser} = useContext(UserContext);
    const [filesFiltered, setFilesFiltered] = useState<Array<any>>([]);
    const [isFilesFilteredByAscending, setIsFilesFilteredByAscending] = useState(true)

    console.log("files filtered inital", filesFiltered);

    const [fileFormData, setFileFormData] = useState<any>({})

      function handleFile(event:any){
        setFileFormData({...fileFormData, "file" : event.target.files[0]});
      }

      function handleInput(e:any){
        setFileFormData({...fileFormData, [e.target.name] : e.target.value})
      }  

      const HandleUpload = async(e:any) => {

        const formData = new FormData();

        formData.set("file",fileFormData.file);
        formData.set("fileLabel",fileFormData.fileLabel);
        formData.set("userId",user._id);
        formData.set("folderId",folderId);

        const url = "http://localhost:3350/api/v1/files"

        const datas = await useFetch("POST",url, formData, false);

        localStorage.setItem("currentUser", JSON.stringify(datas.userUpdated));
        setFiles([...files, datas.file]);
        setUser(datas.userUpdated);

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

      if(isFilesFilteredByAscending){

        const sortedArray = [...files].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscending(!isFilesFilteredByAscending);
      }else {
        
        const sortedArray = [...files].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscending(!isFilesFilteredByAscending);
      }
    }

    function SortByWeight(){

      if(isFilesFilteredByAscending){
        
        const sortedArray = [...files].sort((a, b) => a.fileSizeMb - b.fileSizeMb);
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscending(!isFilesFilteredByAscending);
      }else {
        
        const sortedArray = [...files].sort((a, b) => b.fileSizeMb - a.fileSizeMb);
        setFilesFiltered(sortedArray);
        setIsFilesFilteredByAscending(!isFilesFilteredByAscending);
      }
    }

    function SortByFileType(fileType: string){
      const sortedArray = [...files].filter((element) => element.fileType ==fileType);

      setFilesFiltered(sortedArray)
    }

    function SearchFiles(e:any){

      const filesFound = [...files].filter(({fileLabel}) => fileLabel.includes(e.target.value));
      setFilesFiltered(filesFound);
    }

 
      return (
          <div className='MyFilesSection'>
            <div className='MyFilesSection__header'>
              <p className='MyFilesSection__header--title'> Mes fichiers</p> 
              <input type="text" placeholder=' Rechercher un fichier' onChange={SearchFiles} />
              <AlertComponent title='Ajouter un fichier' buttonText='Ajouter un fichier' agreeOnClick={HandleUpload}>
                <TextField type='text' placeholder=' Nom du fichier' name='fileLabel' onChange={handleInput}/>
                <TextField type='file' name='file' onChange={handleFile}/>
              </AlertComponent>
            </div>
            <div className='MyFilesSection__filters'>
              <div onClick={SortByDate}>Ordonner par dates</div>
              <div onClick={SortByWeight}>Ordonner par poids</div>
              <div onClick={() => SortByFileType("image/png")}>png</div>
              <div onClick={() => SortByFileType("image/jpeg")}>jpg</div>
              <div onClick={() => SortByFileType("application/pdf")}>pdf</div>
              <div></div>
            </div>
            <div className='MyFilesSection__fileList'>
            {
              filesFiltered.map(({fileLabel, _id, filePath, userId, fileSizeMb, folderId}, index) =>
                <ItemComponent key={index} isFolderItem={false} buttonText={fileLabel} agreeOnClick={() => DeleteFile(_id,userId,fileSizeMb,folderId)} clickOnItem={() => {}} ><DownloadSvg fileLabel={fileLabel} href={filePath}/> </ItemComponent>
                )
            }
            </div>
          </div>
  )
}

export default CustomerFilesPage
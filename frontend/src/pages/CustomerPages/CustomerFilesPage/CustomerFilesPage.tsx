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

 
      return (
          <div className='MyFilesSection'>
            <div className='MyFilesSection__header'>
              <p className='MyFilesSection__header--title'> Mes fichiers</p> 
              <AlertComponent title='Ajouter un fichier' buttonText='Ajouter un fichier' agreeOnClick={HandleUpload}>
                <TextField type='text' placeholder=' Nom du fichier' name='fileLabel' onChange={handleInput}/>
                <TextField type='file' name='file' onChange={handleFile}/>
              </AlertComponent>
            </div>
           <div className='MyFilesSection__fileList'>
           {
             files.map(({fileLabel, _id, filePath, userId, fileSizeMb, folderId}, index) =>
              <ItemComponent key={index} isFolderItem={false} buttonText={fileLabel} agreeOnClick={() => DeleteFile(_id,userId,fileSizeMb,folderId)} clickOnItem={() => {}} ><DownloadSvg fileLabel={fileLabel} href={filePath}/> </ItemComponent>
              )
           }
           </div>
           
        </div>
  )
}

export default CustomerFilesPage
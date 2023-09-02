import React, { useContext, useEffect, useState } from 'react'
import "./MyFilesPage.scss";
import { useLocation } from "react-router-dom";
import FileComponent from '../../components/FileComponent/FileComponent';
import { UserContext } from '../../utils/contexts/userContext';
import AddFileButtonComponent from '../../components/AddFileButtonComponent/AddFileButtonComponent';

const MyFilesPage = () => {

    const {user, setUser} = useContext(UserContext);

    const [files, setFiles]=useState<Array<any>>([]);

    const [fileFormData, setFileFormData] = useState<any>({})

    const location = useLocation();
    const folderId = location.state.folderInfo._id;
   
    useEffect(() => {

          const folderId = location.state.folderInfo._id;

          console.log("inside effect file",location.state.folderInfo._id)

          const token = localStorage.getItem("token");
          console.log("mytoken",token);
  
          const options = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
              }
          }
  
          const url = `http://localhost:3350/api/v1/files/folder-files/${folderId}`
    
          fetch(url, options)
          .then(response => response.json())
          .then( data => {console.log("my folders datas:",data); setFiles(data.filesFound)})
          .catch(err => console.log(err));
          
      },[]);

      console.log("files",files)

      function handleFile(event:any){
        console.log("dvzvdzzd",event.target.files[0])
        setFileFormData({...fileFormData, "file" : event.target.files[0]});
      }

      

      async function handleUpload(e:any){

        const token = localStorage.getItem("token");

        const formData = new FormData();

        console.log("file form data", fileFormData);

        formData.set("file",fileFormData.file);
        formData.set("fileLabel",fileFormData.fileLabel);
        formData.set("userId",user._id);
        formData.set("folderId",folderId);

        const options = {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
        }

        const url = "http://localhost:3350/api/v1/files"
        const response = await fetch(url, options);

        const datas = await response.json();

        console.log("datas response",datas);

        console.log("datas",[...files,datas.file])

        localStorage.setItem("currentUser", JSON.stringify(datas.userUpdated));
        setFiles([...files, datas.file]);
        setUser(datas.userUpdated);

        console.log("datas.userUpdated", datas.userUpdated);

      }

      function DeleteFile(fileId: string, userId: string, fileSizeMb: number, folderId: string){

        console.log("inside delete fucntion", fileId)
        const token = localStorage.getItem("token");

        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                fileId,
                fileSizeMb,
                folderId
            })
        }

        const url = "http://localhost:3350/api/v1/files"
  
        fetch(url, options)
        .then(response => response.json())
        .then( data => {console.log("my folders datas:",data); setUser(data.userUpdated); setFiles(data.newFilesList);localStorage.setItem("currentUser", JSON.stringify(data.userUpdated))})
        .catch(err => console.log(err));

    }

    function handleInput(e:any){
      setFileFormData({...fileFormData, [e.target.name] : e.target.value})
    }
      
      return (
          <div className='MyFilesSection'>
            <div className='MyFilesSection__header'>
              <p className='MyFilesSection__header--title'> Mes fichiers</p> 
              <AddFileButtonComponent title={'Veuillez écrire le nom du fichier'} buttonText={'Créer un fichier'} agreeOnClick={handleUpload} onChangeFileField={handleFile} onChangeLabelField={handleInput} />
            </div>
           <div className='MyFilesSection__fileList'>
           {
             files.map(({fileLabel, _id, filePath, userId, fileSizeMb, folderId}, index) => <FileComponent fileLabel={fileLabel} filePath={filePath} OnClick={() => {}}  key={index} title={'Supprimer'} description={'Voulez vous vraiment supprimer ce dossier ?'} buttonText={fileLabel} agreeOnClick={() => DeleteFile(_id,userId,fileSizeMb, folderId)} disagreeOnClick={() => {}} />)
           }
           </div>
           
        </div>
  )
}

export default MyFilesPage
import React, { useContext, useState } from 'react'
import "./CustomerFoldersPage.scss";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import useFetchFolders from '../../../utils/hooks/useFetchFolders';
import useFetch from '../../../utils/hooks/useFetch';



const CustomerFoldersPage =  () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    const {user, setUser} = useContext(UserContext);
    const [folders, setFolders] = useFetchFolders(currentUser._id);
    const [folderFormData, setFolderFormData] = useState<any>({});
    const [messageNewFolderAdded, setMessageNewFolderAdded] = useState<string>();


    function RedirectToFilesPage(element:any){
      navigate("/customerDashboard/files", {state: {folderInfo : element}});
    };

    function HandleInputData(e:any){
      setFolderFormData({[e.target.name] : e.target.value})
    }


    const DeleteFolder = async(folderid: string, userId: string) => {

      const url = `http://localhost:3350/api/v1/folders/${folderid}`;
      const body = { userId };

      const {userUpdated, newFolderList} = await useFetch("DELETE", url, JSON.stringify(body));

      setUser(userUpdated);
      setFolders(newFolderList);
      localStorage.setItem("currentUser", JSON.stringify(userUpdated));

    }

    const CreateNewFolder = async() => {
      const url = "http://localhost:3350/api/v1/folders";
      const body = {"userId": user._id, "folderLabel": folderFormData.folderLabel};

      const {userUpdated, newFolderList} = await useFetch("POST",url,JSON.stringify(body));

      if(userUpdated){
        setUser(userUpdated);
        localStorage.setItem("currentUser",JSON.stringify(userUpdated));
        setMessageNewFolderAdded("Nouveau dossier ajouté !")
      }

      if(newFolderList){
        setFolders(newFolderList);
      }


    }

  return (
    <div className='MyFoldersSection'>
      <div className='MyFoldersSection__header'>
          <p className='MyFoldersSection__header--title'> Mes dossiers</p> 
          <AlertComponent title={'Ajouter un dossier'} buttonText={'Ajouter un dossier'} agreeOnClick={CreateNewFolder} >
            <TextField name="folderLabel" onChange={HandleInputData} placeholder=" Nom du dossier" />     
          </AlertComponent>
      </div >
      <span className='MyFoldersSection__messageNewFolderAdded'>{messageNewFolderAdded}</span>
      <div className='MyFoldersSection__folderList'>
        {
          folders.map( (element, index) => <ItemComponent key={index} isFolderItem buttonText={element.folderLabel} agreeOnClick={() => DeleteFolder(element._id, element.userId)} clickOnItem={() => RedirectToFilesPage(element)} children={undefined} />)    
        }         
      </div>
      
    </div>
  )
}

export default CustomerFoldersPage
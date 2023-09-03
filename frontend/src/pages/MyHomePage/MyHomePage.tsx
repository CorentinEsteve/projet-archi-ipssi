import React, { useContext } from 'react';
import "./MyHomePage.scss";
import { UserContext } from '../../utils/contexts/userContext';

const MyHomePage = () => {
    const {user, setUser} = useContext(UserContext);
    
  return (
    <div>
        <p>Total stockage utilisés : {user.totalStorageUsed}</p>
        <p> Nombre total de fichiers : {user.numberOfFiles}</p>
        <p> Nombre total de dossiers : {user.numberOfFolders}</p>
    </div>
  )
}

export default MyHomePage
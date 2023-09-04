import React, { useContext } from 'react';
import "./CustomerHomePage.scss";
import { UserContext } from '../../../utils/contexts/userContext';

const CustomerHomePage = () => {
    const {user, setUser} = useContext(UserContext);
    
  return (
    <div>
        <p>Total stockage utilisés : {user.totalStorageUsed}</p>
        <p> Nombre total de fichiers : {user.numberOfFiles}</p>
        <p> Nombre total de dossiers : {user.numberOfFolders}</p>
        <p> Total storage purchased : {user.totalStoragePurchased}</p>
    </div>
  )
}

export default CustomerHomePage
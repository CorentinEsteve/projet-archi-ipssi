import React, { useContext } from 'react';
import "./CustomerHomePage.scss";
import { UserContext } from '../../../utils/contexts/userContext';

const CustomerHomePage = () => {
    const {user, setUser} = useContext(UserContext);
    
  return (
    <div className='CustomerHomePageBloc'>
      <div className='CustomerHomePageBloc__blocTitle'>
        <h2 className='CustomerHomePage__title'>Accueil</h2>
      </div>
      <div className='CustomerHomePageBloc__blocStats'>
        <div className='CustomerHomePageBloc__blocStatsInner'>
          <div><p>Total stockage utilisés : </p></div>
          <div><p>{user.totalStorageUsed} Ko</p></div>
          <div><p>Nombre total de fichiers :</p> </div>
          <div><p>{user.numberOfFiles}</p></div>
          <div><p> Nombre total de dossiers : </p></div>
          <div><p>{user.numberOfFolders}</p></div>
          <div><p>Total storage purchased : </p></div>
          <div><p>{user.totalStoragePurchased} Go</p></div>
        </div>
      </div>
        
    </div>
  )
}

export default CustomerHomePage
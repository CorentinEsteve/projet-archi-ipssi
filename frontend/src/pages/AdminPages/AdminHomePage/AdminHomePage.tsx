import React from 'react'
import "./AdminHomePage.scss"
import useFetch from '../../../utils/hooks/useFetch'
import useFetchAllUsers from '../../../utils/hooks/useFetchAllUsers'
import useFetchFilesUploadedToday from '../../../utils/hooks/useFetchFilesUploadedToday'

const AdminHomePage = () => {

    const [users, setUsers] = useFetchAllUsers();
    const [filesUploadedToday, setFilesUploadedToday] = useFetchFilesUploadedToday();

    const numberFilesUploadedToday = filesUploadedToday.length;

    const TotalFilesNumber = users.reduce((acc, user) => acc + user.numberOfFiles,0);

  return (
    <div className='AdminHomePageBloc'>
        <div className='AdminHomePageBloc__blocTitle'>
            <h2 className='AdminHomePage__title'>Dashboard</h2>
        </div>
        <div className='AdminHomePageBloc__blocListUsers'>
            <div className='AdminHomePageBloc__listUsers'>
                <div className='AdminHomePageBloc__listUsers--headercells'>
                    <div>Nom</div>
                    <div>Prénom</div>
                    <div>Nombre total de fichier</div>
                    <div>Nombre total de dossier</div>
                </div>
                {
                    
                    users.map((user) => {
                        return (
                            <div className='AdminHomePageBloc__userCell'>
                                <div>{user.name}</div><div>{user.firstName}</div><div className='AdminHomePageBloc__userCell--statsnumber'>{user.numberOfFiles}</div><div className='AdminHomePageBloc__userCell--statsnumber'>{user.numberOfFolders}</div>
                            </div>
                        )
                    })
                    
                }
            </div>
        </div>
        <div className='AdminHomePageBloc__bottomStats'>
            <p>Il y a au total {TotalFilesNumber} fichiers. </p>
            <p> Dont {numberFilesUploadedToday} uploadé aujourd'hui !</p>
        </div>
        
    </div>
  )
}

export default AdminHomePage
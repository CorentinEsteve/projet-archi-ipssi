import React from 'react'
import "./AdminHomePage.scss"
import useFetch from '../../../utils/hooks/useFetch'
import useFetchAllUsers from '../../../utils/hooks/useFetchAllUsers'
import useFetchFilesUploadedToday from '../../../utils/hooks/useFetchFilesUploadedToday'

const AdminHomePage = () => {

    const [users, setUsers] = useFetchAllUsers();
    const [filesUploadedToday, setFilesUploadedToday] = useFetchFilesUploadedToday();

    console.log("files uploaded today", filesUploadedToday);
    console.log("number files uploaded today", filesUploadedToday.length);

    const numberFilesUploadedToday = filesUploadedToday.length;

    const TotalFilesNumber = users.reduce((acc, user) => acc + user.numberOfFiles,0);



    console.log('total fichier', TotalFilesNumber);

    console.log("AllCustomers", users);

  return (
    <div>
        {
            users.map((user) => {
                return (
                <div className='UserFileNumber'>
                    <p>{user.name}</p><p>{user.firstName}</p><p>{user.numberOfFiles} fichiers</p><p>{user.numberOfFolders} dossiers</p>
                </div>)
            })

        }
        <h2>
            Il y a au total {TotalFilesNumber} fichiers.
        </h2>
        <h2>Dont {numberFilesUploadedToday} uploadé aujourd'hui !</h2>
    </div>
  )
}

export default AdminHomePage
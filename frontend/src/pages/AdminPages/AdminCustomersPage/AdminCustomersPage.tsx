import React from 'react'
import "./AdminCustomersPage.scss";
import useFetch from '../../../utils/hooks/useFetch';
import useFetchAllUsers from '../../../utils/hooks/useFetchAllUsers';
import { useNavigate } from 'react-router-dom';
const AdminCustomersPage = () => {
  const navigate = useNavigate();

  function RedirectToCustomerFoldersPage(element:any){
    navigate("/adminDashboard/customerFolders", {state: {customerInfo : element}});
  };

  const [users, setUsers] = useFetchAllUsers();


  return (
    <div>
      {
        users.map((user) => {
          return (<div className='CustomerRow' onClick={() => RedirectToCustomerFoldersPage(user)}><p>{user.name}</p><p>{user.firstName}</p><p>{user.totalStorageUsed}</p><p>{user.totalStoragePurchased}</p></div>)
        })
      }
    </div>
  )
}

export default AdminCustomersPage
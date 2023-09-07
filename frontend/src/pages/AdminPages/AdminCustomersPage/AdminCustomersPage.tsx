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
    <div className='AdminHomePageBloc'>
      <div className='AdminHomePageBloc__blocTitle'>
          <h2 className='AdminHomePage__title'>Clients</h2>
      </div>
      <div className='AdminHomePageBloc__blocListCustomers'>
        <div className='AdminHomePageBloc__blocListCustomers--inner'>
          {
            
            users.map((user) => {
              return (<div className='CustomerRow' onClick={() => RedirectToCustomerFoldersPage(user)}><p>{user.name}</p><p>{user.firstName}</p><p> <span>{user.totalStorageUsed}</span> Ko utilisé(s)</p><p> <span>{user.totalStoragePurchased}</span> Go acheté(s)</p></div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AdminCustomersPage
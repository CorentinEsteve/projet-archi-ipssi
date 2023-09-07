import React, { useContext, useEffect, useState } from 'react'
import "./CustomerProfilePage.scss"
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationAccountDeletionEmail from '../../../utils/functions/sendConfirmationAccountDeletionEmail';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';
import {loadStripe} from '@stripe/stripe-js';
import addStorageAfterPayment from '../../../utils/functions/addStorageAfterPayment';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import AlertButtonComponent from '../../../components/AlertButtonComponent/AlertButtonComponent';
import { useNavigate } from 'react-router-dom';

const CustomerProfilePage = () => {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    async function DeleteAccount(userId: string){

        const userDeleted = await deleteUserAccount(user._id);

        sendConfirmationAccountDeletionEmail(userDeleted);

        navigate("/", { state : "userAccountDeleted"});
      }
      
    async function LogOut(){
        navigate("/", { state : "userLogOut"});

    }



  return (
    <div className='CustomerProfileSection'>
      <AlertButtonComponent title="Suppression de compte" buttonText="Supprimer mon compte" agreeOnClick={() => DeleteAccount(user._id)} description="Voulez vous vraiment supprimer votre compte ?" />
      <AlertButtonComponent title="Déconnexion" buttonText="Se déconnecter" agreeOnClick={LogOut} description="Voulez vous vraiment vous déconnecter ?" />
    </div>
  )
}

export default CustomerProfilePage
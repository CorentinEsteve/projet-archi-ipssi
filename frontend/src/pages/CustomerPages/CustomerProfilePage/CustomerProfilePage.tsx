import React, { useContext, useEffect, useState } from 'react'
import "./CustomerProfilePage.scss"
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationAccountDeletionEmail from '../../../utils/functions/sendConfirmationAccountDeletionEmail';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';
import {loadStripe} from '@stripe/stripe-js';
import addStorageAfterPayment from '../../../utils/functions/addStorageAfterPayment';

const CustomerProfilePage = () => {

    const {user, setUser} = useContext(UserContext);

    async function DeleteAccount(userId: string){

        const userDeleted = await deleteUserAccount(user._id);

        sendConfirmationAccountDeletionEmail(userDeleted);
    }



  return (
    <div className='CustomerProfileSection'>
        <div className='DeleteAccountButton' onClick={() => DeleteAccount(user._id)}><p>Supprimer mon compte</p></div>
    </div>
  )
}

export default CustomerProfilePage
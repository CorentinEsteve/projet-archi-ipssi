import React, { useContext, useEffect, useState } from 'react'
import "./CustomerProfilePage.scss"
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationAccountDeletionEmail from '../../../utils/functions/sendConfirmationAccountDeletionEmail';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';
import {loadStripe} from '@stripe/stripe-js';
import addStorageAfterPayment from '../../../utils/functions/addStorageAfterPayment';

const CustomerProfilePage = () => {

    const {user, setUser} = useContext(UserContext);
    const stripePromise = loadStripe("pk_test_51NjToNBdjD7XjhkGiAnTKFhAu9PewLdhRoKWW1ok1fHmMAZkiQkAEiUxW61GtiDXHsJLgpeOa7DVDQsqrAFDQ1j000VL2esCZw")

    async function DeleteAccount(userId: string){

        const userDeleted = await deleteUserAccount(user._id);

        sendConfirmationAccountDeletionEmail(userDeleted);
    }

    const [message, setMessage] = useState("");

    console.log("user yyees",user._id)

    useEffect( () => {
      // Check to see if this is a redirect back from Checkout
      const searchParams = new URLSearchParams(window.location.search);
  
      if (searchParams.get("success")) {

        setMessage("Order placed! You will receive an email confirmation.");
        console.log("user start",user._id);
        console.log("user local storage", localStorage.getItem("currentUser"))

        const userId = JSON.parse(localStorage.getItem("currentUser")!)._id

        console.log("userId",userId);
    
        addStorageAfterPayment(userId).then((userUpdated) => {setUser(userUpdated); localStorage.setItem("currentUser",JSON.stringify(userUpdated));console.log(userUpdated)} );
       
      }
  
      if (searchParams.get("canceled")) {

        setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
      }
    }, []);


    const PaymentPage = async(userId:string) => {
        const url = "http://localhost:3350/api/v1/create-checkout-session";
        const token = localStorage.getItem("token");
        
        const option = {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url,option);
        const data = await response.json();

        const stripe = await stripePromise;

        stripe?.redirectToCheckout({sessionId: data.id});
    }



  return (
    <div className='CustomerProfileSection'>
        <p>{ message }</p>
        <div className='DeleteAccountButton' onClick={() => DeleteAccount(user._id)}><p>Supprimer mon compte</p></div>
        
            <div className='Acheter' onClick={() => PaymentPage(user._id)}>Acheter</div>
            <form action="/create-checkout-session" method='POST'>
                <button type='submit'> Acheter</button>
            </form>
    </div>
  )
}

export default CustomerProfilePage
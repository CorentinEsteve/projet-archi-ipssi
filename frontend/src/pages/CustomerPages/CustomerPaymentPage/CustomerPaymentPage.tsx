import React, { useContext, useEffect, useState } from 'react'
import "./CustomerPaymentPage.scss"
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '../../../utils/contexts/userContext';
import PaymentCardComponent from '../../../components/PaymentCardComponent/PaymentCardComponent';
import addStorageAfterPayment from '../../../utils/functions/addStorageAfterPayment';
import sendPurchasedConfirmation from '../../../utils/functions/sendPurchasedConfirmation';
import displayStripePaymentWall from '../../../utils/functions/displayStripePaymentWall';

const CustomerPaymentPage = () => {

    const {user, setUser} = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [isPurchaseSucceed, setIsPurchaseSucceed] = useState<boolean>();

    const stripePromise = loadStripe("pk_test_51NjToNBdjD7XjhkGiAnTKFhAu9PewLdhRoKWW1ok1fHmMAZkiQkAEiUxW61GtiDXHsJLgpeOa7DVDQsqrAFDQ1j000VL2esCZw")

    useEffect( () => {
      // Check to see if this is a redirect back from Checkout
      const searchParams = new URLSearchParams(window.location.search);
  
      if (searchParams.get("success")) {
        setIsPurchaseSucceed(true);
        
        setMessage("Achat réussi! Vous receverez une confirmation dans votre boite électronique.");
        
        const userFromLocalStorage = JSON.parse(localStorage.getItem("currentUser")!);
        const userId = userFromLocalStorage._id;
        const userFirstName = userFromLocalStorage.firstName;
        const userEmail = userFromLocalStorage.email;
        
        sendPurchasedConfirmation(userFirstName, userEmail);
        
        addStorageAfterPayment(userId).then((userUpdated) => {setUser(userUpdated); localStorage.setItem("currentUser",JSON.stringify(userUpdated));console.log(userUpdated)});
        console.log("purchase infos user",{userFirstName, userEmail})
       
    }
    
    if (searchParams.get("canceled")) {
        setIsPurchaseSucceed(false);

        setMessage("Achat Annulé -- Votre achat n'a pas pu etre traité.");
      }
    }, []);
    
    /*const PaymentPage = async(userId:string) => {
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
*/
  return (
    <div className='CustomerPaymentPageBloc'>
      <div className='CustomerPaymentPageBloc__blocTitle'>
        <h2 className='CustomerPaymentPage__title'>Payments</h2>
      </div>
      <div className='CustomerPaymentPageBloc__blocPayments'>
        <h1 className={ isPurchaseSucceed ? "purchaseSucceed" : "purchaseCanceled"}>{ message }</h1>
        <PaymentCardComponent clickOnPurchaseButton={() => displayStripePaymentWall(user._id)} />
      </div>
    </div>
  )
}

export default CustomerPaymentPage
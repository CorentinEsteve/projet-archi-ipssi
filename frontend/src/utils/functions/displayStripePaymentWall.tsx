import { loadStripe } from '@stripe/stripe-js';
import React from 'react'

const displayStripePaymentWall = async(userId:string, isSignUpStep = false) => {
    const stripePromise = loadStripe("pk_test_51NjToNBdjD7XjhkGiAnTKFhAu9PewLdhRoKWW1ok1fHmMAZkiQkAEiUxW61GtiDXHsJLgpeOa7DVDQsqrAFDQ1j000VL2esCZw")
        const url = `${"http://localhost:3350/api/v1/create-checkout-session/" + isSignUpStep}`;
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

export default displayStripePaymentWall
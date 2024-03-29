import React, { useEffect } from 'react'
import TextField from '../../../components/TextField/TextField';
import "./SignUpPage.scss";
import { useState, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../../../utils/contexts/userContext';
import sendConfirmationSignUpEmail from '../../../utils/functions/sendConfirmationSignUpEmail';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../../utils/hooks/useFetch';
import displayStripePaymentWall from '../../../utils/functions/displayStripePaymentWall';
import { sign } from 'crypto';
import deleteUserAccount from '../../../utils/functions/deleteUserAccount';

const SignUpPage = () => {

    const [signUpForm, setSignUpForm] = useState({ name :"", email:""});
    const { setUser } = useContext(UserContext);
    const [signUpFailedMessage, setSignUpFailedMessage] = useState<string>();
    const navigate = useNavigate();

    function HandleSignUpForm(e:any){
        e.preventDefault();
        setSignUpForm({...signUpForm, [e.target.name]: e.target.value})
    }

    async function SendSignUpForm(){

      
      const url = "http://localhost:3350/api/v1/signUp";
      
      const { user, token } = await useFetch("POST", url, JSON.stringify(signUpForm));
      localStorage.setItem("currentUser",JSON.stringify(user));
      localStorage.setItem("token",token);
      console.log("user feteched return",user);
      if(user){
        
        const {name, firstName, email, _id, numberOfFiles, numberOfFolders, totalStorageUsed, totalStoragePurchased} = user;
        setUser({name, firstName, email, _id, numberOfFiles, numberOfFolders, totalStorageUsed, totalStoragePurchased});
        sendConfirmationSignUpEmail(signUpForm.name, signUpForm.email);

        displayStripePaymentWall(_id, true);

        return;
      }
     }

     useEffect(() => {

      const searchParams = new URLSearchParams(window.location.search);
      if(searchParams.get("canceled")){
        setSignUpFailedMessage("Votre inscription à été annulé");
        const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

        if(currentUser){
         const userAccountDeleted = deleteUserAccount(currentUser._id);
         console.log("userAccountDeleted",userAccountDeleted);
        }

      }
     }, [])

  return (
    <div className='SignUpPage'>
          <p className='SignUpPage__failedMessage'>{signUpFailedMessage}</p>
          <p className='SignUpPage__title'> Créer un compte</p>
          <div className='SignUpPage__connectionMethods'>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="35px" height="35px"><path fill="#ffff" d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="35px" height="35px"><path fill="#ffff" d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 26.580078 10 C 23.92822 10 21.917076 10.867217 20.677734 12.400391 C 19.438393 13.933564 19 15.981046 19 18.226562 L 19 20 L 17 20 A 1.0001 1.0001 0 0 0 16 21 L 16 26 A 1.0001 1.0001 0 0 0 17 27 L 19 27 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 27 L 31 27 A 1.0001 1.0001 0 0 0 31.980469 26.195312 L 32.980469 21.195312 A 1.0001 1.0001 0 0 0 32 20 L 27 20 L 27 17.806641 C 27 17.321617 27.03137 17.325614 27.171875 17.234375 C 27.312385 17.143136 27.820197 17 28.710938 17 L 32 17 A 1.0001 1.0001 0 0 0 33 16 L 33 12 A 1.0001 1.0001 0 0 0 32.335938 11.058594 C 32.335938 11.058594 29.456337 10 26.580078 10 z M 26.580078 12 C 28.472499 12 30.227501 12.510447 31 12.751953 L 31 15 L 28.710938 15 C 27.663677 15 26.813974 15.08458 26.083984 15.558594 C 25.353995 16.032605 25 16.940664 25 17.806641 L 25 21 A 1.0001 1.0001 0 0 0 26 22 L 30.779297 22 L 30.179688 25 L 26 25 A 1.0001 1.0001 0 0 0 25 26 L 25 38 L 21 38 L 21 26 A 1.0001 1.0001 0 0 0 20 25 L 18 25 L 18 22 L 20 22 A 1.0001 1.0001 0 0 0 21 21 L 21 18.226562 C 21 16.24708 21.405014 14.681779 22.232422 13.658203 C 23.05983 12.634627 24.336936 12 26.580078 12 z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="35px" height="35px"><path fill="#ffff" d="M 33.375 0 C 30.539063 0.191406 27.503906 1.878906 25.625 4.15625 C 23.980469 6.160156 22.601563 9.101563 23.125 12.15625 C 22.65625 12.011719 22.230469 11.996094 21.71875 11.8125 C 20.324219 11.316406 18.730469 10.78125 16.75 10.78125 C 12.816406 10.78125 8.789063 13.121094 6.25 17.03125 C 2.554688 22.710938 3.296875 32.707031 8.90625 41.25 C 9.894531 42.75 11.046875 44.386719 12.46875 45.6875 C 13.890625 46.988281 15.609375 47.980469 17.625 48 C 19.347656 48.019531 20.546875 47.445313 21.625 46.96875 C 22.703125 46.492188 23.707031 46.070313 25.59375 46.0625 C 25.605469 46.0625 25.613281 46.0625 25.625 46.0625 C 27.503906 46.046875 28.476563 46.460938 29.53125 46.9375 C 30.585938 47.414063 31.773438 48.015625 33.5 48 C 35.554688 47.984375 37.300781 46.859375 38.75 45.46875 C 40.199219 44.078125 41.390625 42.371094 42.375 40.875 C 43.785156 38.726563 44.351563 37.554688 45.4375 35.15625 C 45.550781 34.90625 45.554688 34.617188 45.445313 34.363281 C 45.339844 34.109375 45.132813 33.910156 44.875 33.8125 C 41.320313 32.46875 39.292969 29.324219 39 26 C 38.707031 22.675781 40.113281 19.253906 43.65625 17.3125 C 43.917969 17.171875 44.101563 16.925781 44.164063 16.636719 C 44.222656 16.347656 44.152344 16.042969 43.96875 15.8125 C 41.425781 12.652344 37.847656 10.78125 34.34375 10.78125 C 32.109375 10.78125 30.46875 11.308594 29.125 11.8125 C 28.902344 11.898438 28.738281 11.890625 28.53125 11.96875 C 29.894531 11.25 31.097656 10.253906 32 9.09375 C 33.640625 6.988281 34.90625 3.992188 34.4375 0.84375 C 34.359375 0.328125 33.894531 -0.0390625 33.375 0 Z M 32.3125 2.375 C 32.246094 4.394531 31.554688 6.371094 30.40625 7.84375 C 29.203125 9.390625 27.179688 10.460938 25.21875 10.78125 C 25.253906 8.839844 26.019531 6.828125 27.1875 5.40625 C 28.414063 3.921875 30.445313 2.851563 32.3125 2.375 Z M 16.75 12.78125 C 18.363281 12.78125 19.65625 13.199219 21.03125 13.6875 C 22.40625 14.175781 23.855469 14.75 25.5625 14.75 C 27.230469 14.75 28.550781 14.171875 29.84375 13.6875 C 31.136719 13.203125 32.425781 12.78125 34.34375 12.78125 C 36.847656 12.78125 39.554688 14.082031 41.6875 16.34375 C 38.273438 18.753906 36.675781 22.511719 37 26.15625 C 37.324219 29.839844 39.542969 33.335938 43.1875 35.15625 C 42.398438 36.875 41.878906 38.011719 40.71875 39.78125 C 39.761719 41.238281 38.625 42.832031 37.375 44.03125 C 36.125 45.230469 34.800781 45.988281 33.46875 46 C 32.183594 46.011719 31.453125 45.628906 30.34375 45.125 C 29.234375 44.621094 27.800781 44.042969 25.59375 44.0625 C 23.390625 44.074219 21.9375 44.628906 20.8125 45.125 C 19.6875 45.621094 18.949219 46.011719 17.65625 46 C 16.289063 45.988281 15.019531 45.324219 13.8125 44.21875 C 12.605469 43.113281 11.515625 41.605469 10.5625 40.15625 C 5.3125 32.15625 4.890625 22.757813 7.90625 18.125 C 10.117188 14.722656 13.628906 12.78125 16.75 12.78125 Z"/></svg>
          </div>
          <div className='SignUpPage__dividerBloc'>
            <div className='SignUpPage__divider'></div>
            <p>Ou</p>
            <div className='SignUpPage__divider'></div>
          </div>
          <form className='SignUpPage__form' action="">
            <div>
                <TextField placeholder=' Nom' name='name' onChange={HandleSignUpForm} />
                <TextField placeholder=' Prénom' name='firstName' onChange={HandleSignUpForm} />
                <TextField placeholder=' Email' name='email' onChange={HandleSignUpForm} />
                <TextField placeholder=' Mot de passe' type='password' name='password' onChange={HandleSignUpForm} />
            </div>
            <div className='SignUpPage__termsConditionsBloc'> <input className='SignUpPage__checkbox' type="checkbox" name="termsAndCoditions" id="termsAndCoditions" /> <label htmlFor='termsAndCoditions' className='SignUpPage__termsConditions'>J'accepte les termes et la politique de confidentialité.</label></div>
            <div className='SignUpPage__sendFormButton' onClick={SendSignUpForm} ><p>S'inscrire</p></div>
            <p className='SignUpPage__alreadySignedUp'>Déjà un compte ? <a className='SignUpPage__link' href='#'> <Link to="/">Connectez-vous !</Link></a></p>
          </form>
    </div>
  )
}

export default SignUpPage

function PaymentPage() {
  throw new Error('Function not implemented.');
}

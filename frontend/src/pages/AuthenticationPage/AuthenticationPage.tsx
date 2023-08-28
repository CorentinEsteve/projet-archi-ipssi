import React from 'react'
import "./AuthenticationPage.scss";
import SignUpPage from "../SignUpPage/SignUpPage";
import BannerComponent from '../../components/BannerComponent/BannerComponent';
import LogInPage from '../LogInPage/LogInPage';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthenticationPage = () => {

  return (
    <section className='AuthenticationSection'>
      <div  className='AuthenticationContainer'>
        <BannerComponent />
        <Outlet />
      </div>
    </section>
  )
}

export default AuthenticationPage
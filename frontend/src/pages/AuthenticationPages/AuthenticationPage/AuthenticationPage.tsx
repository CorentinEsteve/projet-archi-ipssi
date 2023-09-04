import React from 'react'
import "./AuthenticationPage.scss";
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
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
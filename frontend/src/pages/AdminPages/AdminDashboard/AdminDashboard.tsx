import React, { useState } from 'react'
import "./AdminDashboard.scss";
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import CustomButton from "../../../components/CustomButton/CustomButton";
import { Link, Outlet } from 'react-router-dom';
import customerProfileSvg from "../../../assets/profile-customer-icon.svg";
import statsSvg from "../../../assets/stats-icon.svg";
const AdminDashboard = () => {

  return (
    <section className='AdminDashboard'>
      <div className='UserNavBar'>
        <div className='UserNavBar__toggle' >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" id="storage"><path fill="#ffff" fillRule="evenodd" d="M122 154h56a12 12 0 0 0 0-24h-56a12 12 0 0 0 0 24zm0-20h56a8 8 0 0 1 0 16h-56a8 8 0 0 1 0-16zm-.2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm40.2 14h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm40.2 18h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4z" transform="translate(-110 -130)"></path></svg>
        </div>
        <BannerComponent />
        <div className="UserNavBar__middleBloc" >
          <div  className='UserNavBar__navigations'>
            <Link to="/adminDashboard/home">
              <CustomButton text="Statistiques" svgIcon={statsSvg} onClick={undefined} variant={''} />
            </Link>
            <Link to="/adminDashboard/customers">
              <CustomButton text="Clients" svgIcon={customerProfileSvg} onClick={undefined} variant={''} />
            </Link>
            <Link to="/adminDashboard/profile">
              <CustomButton text="Profil" svgIcon={customerProfileSvg} onClick={undefined} variant={''} />
            </Link>
          </div>
        </div>
        <div className='UserNavBar__profileBloc' >
          <div className='UserNavBar__profilePicture'></div>
          <p className='UserNavBar__profileText'>Profil</p>
        </div>
      </div>
      <div className='OutletBloc'>
        <Outlet />
      </div>
    </section>
  )
}

export default AdminDashboard
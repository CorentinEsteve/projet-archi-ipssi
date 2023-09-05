import React, { useState } from 'react'
import "./CustomerDashboard.scss";
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import CustomButton from "../../../components/CustomButton/CustomButton";
import { Link, Outlet } from 'react-router-dom';

const CustomerDashboard = () => {

  return (
    <section className='UserDashboard'>
      <div className='UserNavBar'>
        <div className='UserNavBar__toggle' >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" id="storage"><path fill="#ffff" fillRule="evenodd" d="M122 154h56a12 12 0 0 0 0-24h-56a12 12 0 0 0 0 24zm0-20h56a8 8 0 0 1 0 16h-56a8 8 0 0 1 0-16zm-.2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm40.2 14h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm40.2 18h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4z" transform="translate(-110 -130)"></path></svg>
        </div>
        <BannerComponent />
        <div className="UserNavBar__middleBloc" >
          <div  className='UserNavBar__navigations'>
            <Link to="/customerDashboard/home">
              <CustomButton text="Dashboard" svgIcon={undefined} onClick={undefined} variant={''} />
            </Link>
            <Link to="/customerDashboard/folders">
              <CustomButton text="My folders" svgIcon={undefined} onClick={undefined} variant={''} />
            </Link>
            <Link to="/customerDashboard/profile">
              <CustomButton text="Profile" svgIcon={undefined} onClick={undefined} variant={''} />
            </Link>
          </div>
          <div className='StorageIndicatorComponent'>
            <div className='StorageIndicatorComponent__title' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" id="cloud"><path fill='#ffff' d="M18.42,9.21a7,7,0,0,0-13.36,1.9A4,4,0,0,0,6,19H17a5,5,0,0,0,1.42-9.79ZM17,17H6a2,2,0,0,1,0-4,1,1,0,0,0,1-1,5,5,0,0,1,9.73-1.61,1,1,0,0,0,.78.66A3,3,0,0,1,17,17Z"></path></svg><p>Stockage</p></div>
            <div className='StorageIndicatorComponent__blocProgress'><div  className='StorageIndicatorComponent__progress'></div></div>
            <div className='StorageIndicatorComponent__checkStorage'>4,9Go libre sur 20Go</div>
            <a className='StorageIndicatorComponent__linkIncreaseStorage' href="#"> Augmenter mon stockage</a>

          </div>
        </div>
        <div className='UserNavBar__profileBloc' >
          <div className='UserNavBar__profilePicture'></div>
          <p className='UserNavBar__profileText'>Profile</p>
        </div>
      </div>
      <div className='OutletBloc'>
      <Outlet />
      </div>
      
    </section>
  )
}

export default CustomerDashboard
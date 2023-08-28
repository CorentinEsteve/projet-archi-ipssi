import React, { useState } from 'react'
import "./UserDashboard.scss";
import BannerComponent from '../../components/BannerComponent/BannerComponent';
import CustomButton from '../../components/CustomButton/CustomButton';

const UserDashboard = () => {

const [isOpen, setIsOpen] = useState(false);

function HandleNavBarOpening(){
  setIsOpen(!isOpen);
}

  return (
    <section>
      <div className='UserNavBar'>
        <div className='UserNavBar__toggle'  onClick={HandleNavBarOpening}>
          {isOpen ? <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path fill="#ffff" d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path fill="#ffff" d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/></svg>}
        </div>
        <BannerComponent />
        <div className={`UserNavBar__middleBloc ${ isOpen ? "UserNavBar__middleBloc--open" : "UserNavBar__middleBloc--close"} }`} >
          <div  className='UserNavBar__navigations'>
            <CustomButton text="Dashboard" svgIcon={undefined} onClick={undefined} variant={''} />
            <CustomButton text="Documents" svgIcon={undefined} onClick={undefined} variant={''} />
            <CustomButton text="Corbeille" svgIcon={undefined} onClick={undefined} variant={''} />
          </div>
          <div className='StorageIndicatorComponent'>

          </div>
        </div>
        <div className='UserNavBar__profileBloc' >
          <div className='UserNavBar__profilePicture'></div>
          <p className='UserNavBar__profileText'>Profile</p>
        </div>

      </div>
    </section>
  )
}

export default UserDashboard
import React from 'react'
import "./BannerComponent.scss";

const BannerComponent = () => {
  return (
    <div className='BanniereArchitech'>
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"><path d="m10 18 12 4 10-4 10 4 12-4-22-8-22 8z" fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4px" className="stroke-000000"></path><path d="M22 22v32l-12-4V18M42 22v32l12-4V18M22 54l10-4 10 4M32 50V18" fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4px" className="stroke-000000"></path></svg>
        <h2 className='BanniereArchitech__title'>Archi'tech</h2>
  </div>  
  )
}

export default BannerComponent
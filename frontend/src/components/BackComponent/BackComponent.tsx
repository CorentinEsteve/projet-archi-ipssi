import React from 'react'
import "./BackComponent.scss"
import backArrowSvg from "../../assets/back-arrow.svg"

type BackComponentProps = {
    onClick:any,
}

const BackComponent = ({onClick} : BackComponentProps ) => {
  return (
    <div className='BackComponent'>
        <img onClick={onClick} className='BackComponent__backArrowSvg' src={backArrowSvg} alt="Back arrow" />
    </div>
  )
}

export default BackComponent
import { useEffect, useState } from "react";
import "./CustomCheckbtn.scss";


type inputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const CustomCheckBtn = (props : inputProps) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    function HandleCheckBtn(){
        console.log(!isChecked);
        setIsChecked(!isChecked);
    }
   
  return (
    <div className={`CheckBox ${isChecked && "CheckBox--checked"}`} >
        <label htmlFor={props.id} onClick={HandleCheckBtn} className={`CheckBox_ball ${isChecked && "CheckBox_ball--checked"}`}></label>
        <input id={props.id} className="CheckBox_input" {...props} name='mode' type='checkbox' />  
    </div>
  )
}

export default CustomCheckBtn
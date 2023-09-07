import { Children, useState } from "react";
import "./AlertButtonComponent.scss";
import { Link } from "react-router-dom";
import TextField from "../TextField/TextField";

type AlertButtonComponentProps = {
    title: string,
    buttonText:string,
    agreeOnClick: any,
    description: string
}

const AlertButtonComponent = ({buttonText, title, agreeOnClick, description}: AlertButtonComponentProps) => {

    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

    function ShowAlert(){
        setIsDisplayed(!isDisplayed);
    }
    
    function HandlePropagation(e:any){
        e.stopPropagation();

    }

    function DisagreeTrigger(){
        ShowAlert();
    }

    function AgreeTrigger(){
        agreeOnClick()
        ShowAlert();
    }

  return (
      
      <div className='AlertButtonComponent'>
            <div className="AlertButtonComponent_item" onClick={ShowAlert}  >
                <div>{buttonText}</div>   
            </div>
        <div className={`AlertButtonComponent_background ${isDisplayed && "AlertButtonComponent_background--displayed"}`} onClick={ShowAlert}  >
            <div className="AlertButtonComponent_container" onClick={HandlePropagation} >
                <h3 className="AlertButtonComponent_title" >{title}</h3>
                <div className="AlertButtonComponent_description">
                    <p>{description}</p>
                </div>
                <div className="AlertButtonComponent_buttons"><div className="AlertButtonComponent_button" onClick={DisagreeTrigger} >Annuler</div><div className="AlertButtonComponent_button" onClick={AgreeTrigger}>Oui</div></div>
            </div>
        </div>
    </div>
  )
}

export default AlertButtonComponent
import { useState } from "react";
import "./AddFileButtonComponent.scss";
import { Link } from "react-router-dom";
import TextField from "../TextField/TextField";

type AddFileButtonComponentProps = {
    title: string,
    buttonText:string,
    agreeOnClick: any,
    onChangeLabelField: any,
    onChangeFileField: any,
}

const AddFileButtonComponent = ({buttonText,title, agreeOnClick, onChangeLabelField, onChangeFileField}: AddFileButtonComponentProps) => {

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
      
      <div className='AddFileButtonComponent'>
            <div className="AddFileButtonComponent_item" onClick={ShowAlert}  >
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="24px" height="24px">    <path fill="#ffff" d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"/></svg>
                <div>{buttonText}</div>   
            </div>
        <div className={`AddFileButtonComponent_background ${isDisplayed && "AddFileButtonComponent_background--displayed"}`} onClick={ShowAlert}  >
            <div className="AddFileButtonComponent_container" onClick={HandlePropagation} >
                <h3 className="AddFileButtonComponent_title" >{title}</h3>
                <form className="AddFileButtonComponent_description">
                    <TextField name="fileLabel" onChange={onChangeLabelField} placeholder=" Nom du dossier" />
                    <TextField type="file" name="file" onChange={onChangeFileField} />
                </form>
                <div className="AddFileButtonComponent_buttons"><div className="AddFileButtonComponent_button" onClick={DisagreeTrigger} >Annuler</div><div className="AddFileButtonComponent_button" onClick={AgreeTrigger}>Créer</div></div>
            </div>
        </div>
    </div>
  )
}

export default AddFileButtonComponent
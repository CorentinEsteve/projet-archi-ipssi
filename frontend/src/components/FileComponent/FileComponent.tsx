import { useState } from "react";
import "./FileComponent.scss";
import { Link } from "react-router-dom";
import avatar from "./testDisplayImage.jpg";

type AlertDialogProps = {
    title: string,
    description: string,
    buttonText:string,
    agreeOnClick: any,
    disagreeOnClick: any,
    OnClick:any,
    filePath: string,
    fileLabel: string
}

const AlertDialog = ({buttonText,title, description, agreeOnClick, disagreeOnClick, OnClick, fileLabel, filePath}: AlertDialogProps) => {

    const [isDisplayed, setIsDisplayed] = useState<boolean>(false)
    const [imageOpened, setImageOpened] = useState("")

    function ShowAlert(){
        setIsDisplayed(!isDisplayed);
    }
    
    function HandlePropagation(e:any){
        e.stopPropagation();

    }

    function DisagreeTrigger(){
        disagreeOnClick();
        ShowAlert();
    }

    function AgreeTrigger(){
        agreeOnClick()
        ShowAlert();
    }

    function DownloadFile(){
        console.log("ooororrroro")
        console.log(fileLabel)
        console.log(filePath)
    }

  return (
      
      <div className='AlertDialog'>
            <div className="AlertDialog_item"  >
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"/></svg>
                <p onClick={OnClick}>{buttonText}</p>
                <div onClick={DownloadFile}> <a href={filePath} download={"exemple dddl"} target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><title>11.download</title><g id="_11.download" data-name="11.download"><path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z"/><polygon points="12 14.414 7.293 9.707 8.707 8.293 12 11.586 15.293 8.293 16.707 9.707 12 14.414"/><rect x="11" y="5" width="2" height="8"/><polygon points="17 19 7 19 7 16 9 16 9 17 15 17 15 16 17 16 17 19"/></g></svg></a> </div>
                <div onClick={ShowAlert}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"> <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg></div>
            </div>
        <div className={`AlertDialog_background ${isDisplayed && "AlertDialog_background--displayed"}`} onClick={ShowAlert}  >
            <div className="AlertDialog_container" onClick={HandlePropagation} >
                <h3 className="AlertDialog_title" >{title}</h3>
                <p className="AlertDialog_description">{description}</p>
                <div className="AlertDialog_buttons"><div className="AlertDialog_button" onClick={DisagreeTrigger} >DISAGREE</div><div className="AlertDialog_button" onClick={AgreeTrigger}>AGREE</div></div>
            </div>
        </div>
    </div>
  )
}

export default AlertDialog
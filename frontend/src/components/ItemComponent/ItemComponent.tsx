import { useState } from "react";
import "./ItemComponent.scss";
import { Link } from "react-router-dom";
import FolderSvg from "../../assets/svg/FolderSvg";
import { type } from "os";
import FileSvg from "../../assets/svg/FileSvg";

type ItemComponentProps = {
    isFolderItem: boolean,
    buttonText:string,
    agreeOnClick: any,
    clickOnItem:any,
    children: any
}

const ItemComponent = ({buttonText, isFolderItem, agreeOnClick, clickOnItem, children}: ItemComponentProps) => {

    const [isDisplayed, setIsDisplayed] = useState<boolean>(false)

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
      
      <div className='ItemComponent'>
            <div onClick={clickOnItem} className="ItemComponent_item"  >
               {
                isFolderItem ? <FolderSvg />: <FileSvg />
               }
                <p >{buttonText}</p>
                { children }
                <div onClick={HandlePropagation}><svg onClick={ShowAlert} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"> <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg></div>
            </div>
        <div className={`ItemComponent_background ${isDisplayed && "ItemComponent_background--displayed"}`} onClick={ShowAlert}  >
            <div className="ItemComponent_container" onClick={HandlePropagation} >
                <h3 className="ItemComponent_title" >Supprimer</h3>
                <p className="ItemComponent_description">Voulez vous vraiment supprimer ce {isFolderItem ? "dossier" : "fichier"} ?</p>
                <div className="ItemComponent_buttons"><div className="ItemComponent_button" onClick={DisagreeTrigger} >Annuler</div><div className="ItemComponent_button" onClick={AgreeTrigger}>Oui</div></div>
            </div>
        </div>
    </div>
  )
}

export default ItemComponent
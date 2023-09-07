import "./CustomButton.scss";

const CustomButton = ({text, onClick, variant, svgIcon  } : ButtonProps) => {
  return (
    <div className={`Button ${variant}`} onClick={onClick}> 
       <img src={svgIcon} />
       <span className={`Button_text ${variant}` }>{text}</span>
    </div>
  )
}

type ButtonProps = {
  text: string,
  svgIcon: any,
  onClick: any,
  variant: string,
}

export default CustomButton;
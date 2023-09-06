import React from 'react'
import "./PaymentCardComponent.scss"

type PaymentCardComponentProps = {
    clickOnPurchaseButton:any
}

const PaymentCardComponent = ({clickOnPurchaseButton}: PaymentCardComponentProps) => {
  return (
    <div className='PaymentCardComponent'>
        <div className='PaymentCardComponent__price'><p>20 euros</p></div>
        <div className='PaymentCardComponent__description'>
            <p>- Achat unique, pas de récurrence</p>
            <p>- Achats cumulatifs</p>
            <p>- 20 Go de stockage supplémentaire</p>
        </div>
        <div className='PaymentCardComponent__purchaseButton' onClick={clickOnPurchaseButton}><p>Acheter</p></div>
    </div>
  )
}

export default PaymentCardComponent
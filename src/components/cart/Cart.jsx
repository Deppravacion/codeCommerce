import React from 'react'
import { Summary } from '../summary/summary'
import { Items } from './Items';
import { Shipping } from '../shipping/Shipping';
import { useState } from 'react';
import { Payment } from '../payment/Payment'
import { ProgressBar } from '../progressBar/ProgressBar';
import { Confirmation } from './Confirmation';

export const Cart = (props) => {
  const mainState = props.mainState
  const { allUsers } = props.mainState
  const { currentUserIndex } = props.mainState
  const currentUser = allUsers[currentUserIndex]
  const { cartItems } = props.mainState
  const { cartItems: { bricks, mortar} } = props.mainState
  const [miniDisplay, setMiniDisplay] = useState('Items')
  const [cardType, setCardType] = useState('')
  const goHome = () => props.changeDisplayPage('Welcome')  
  const cardTypeDrill = (state) => setCardType(state)
  const changeMiniPage = (page) => setMiniDisplay(page)
  const goShipping = () => setMiniDisplay('Shipping')
  const goPayment = () =>  setMiniDisplay('Payment') 
  const goItems = () => setMiniDisplay('Items')
  const goConfirmation = () => setMiniDisplay('Confirmation')

  return(
    <>
      <ProgressBar 
        miniDisplay={miniDisplay}
      /> 
      <h2>welcome Mr.{currentUser.firstName} {currentUser.lastName}</h2>
      <div className="cartBodyWrapper">
      <div className="cartLeftBlock">     
        { miniDisplay == 'Items' && 
          <Items 
          mainState={props.mainState}
          changeCartQuantity={props.changeCartQuantity}
          changeMiniPage={changeMiniPage}
          goShipping={goShipping}
          />
        }
        { miniDisplay == 'Shipping' &&
          <Shipping 
          mainState={props.mainState}
          addShipping={props.addShipping}          
          changeExpressSpeed={props.changeExpressSpeed}
          goPayment={goPayment}
          goItems={goItems}
          />
        }
        { miniDisplay == 'Payment' &&
          <Payment 
          mainState={props.mainState}
          addPayment={props.addPayment}
          goShipping={goShipping}
          cardTypeDrill={cardTypeDrill}
          goConfirmation={goConfirmation}
          />
        }
        { miniDisplay == 'Confirmation' &&
          <Confirmation 
          mainState={props.mainState}
          goConfirmation={goConfirmation}
          />
        }
     </div>
    <div className='summary'>
      <Summary 
        mainState={mainState}
        cardType={cardType}
        changePromo={props.changePromo}
      />
    </div>
    </div>
    <div className="container btnWrapper">
      <button onClick={goHome}> Home</button>
    </div>
  </>
  )
}

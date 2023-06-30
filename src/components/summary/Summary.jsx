import React from 'react'
import { CARD, CARDICON } from  '../constants';
import HARE from '../../assets/hare.png' 
import TURTLE from '../../assets/turtle.png'

export const Summary = (props) => {

  const { allUsers } = props.mainState
  const { currentUserIndex } = props.mainState
  const currentUser = allUsers[currentUserIndex]
  const { cartItems } = props.mainState
  const { cartItems: { bricks, mortar} } = props.mainState
  const summaryImage = props.hasExpressShipping ? HARE : TURTLE

  const handleDiscount = (e) => {    
    if ( e.target.value === '100off') {
      props.changePromo(true)
    }
    const radios = document.getElementsByName('discount')
    radios.forEach((rad) => rad.disabled = true)    
  }

  return (
    <>
      <h2>summary</h2>
      <div className="promo">
        <fieldset>
          <legend>Choose your discount option:</legend>
          <div>
            <input type="radio" id="100off" name="discount" value='100off'  onClick={handleDiscount}/>
            <label htmlFor="100off">$100  Instant Rebate</label>
          </div>
          <div>
            <input type="radio" id="gamble" name="discount" value='gamble'  onClick={handleDiscount}/>
            <label htmlFor="gamble">Mystery Discount - at your own risk</label>
          </div>
        </fieldset>
      </div>
      <div className='cartItems'>
        <div className="summaryHeader">
          <span>image</span>
          <span>name</span>
          <span>quantity</span>
          <span>total</span>
        </div>

        { bricks.quantity > 0 || mortar.quantity > 0 
          ? Object.values(cartItems)
            .filter((elm) => elm.quantity > 0)
            .map((item, index) => (
              <div className="summaryItems" key={index}>
                <div><img src={item.image}/></div>
                <div>{item.name}</div>
                <div>{item.quantity}</div>
                <div>{item.total}</div>
              </div>
            ))
          : null
        }
      </div>
      <div className='totals' >  
        <ul>
          <li><span>Cart Subtotal: </span><span>${props.mainState.subTotal ?? 0 }</span> </li>
          <li><span>Shipping & Handling:</span><span> ${props.mainState.fee ?? 0}</span> </li>
          <li><span>Discount: </span><span>${props.mainState.discount ?? 0}</span></li>
          <li><span>Cart Total: </span><span>${props.mainState.total ?? 0 }</span></li>
        </ul>
      </div>
      <div className="summaryHeader">
        <span>SHIPPING</span>
        <span>PAYMENT</span>
      </div>
      <div className="shippingANDpayment">       
        { Object.values(props.mainState?.payment).length 
          ? Object.values(props.mainState?.payment) &&
          <div>
            <span className="summaryImageWrapper">   <img style={{width: '75px'}} src={props.mainState.hasExpressShipping ? HARE : TURTLE}    />
       
            </span>
            <span className="summaryImageWrapper">  
            <img style={{width: '95px'}} src={CARDICON[props.cardType]}/>
            </span>                         
          </div>
          : null            
        }
      </div>
    </>
  )
   
}
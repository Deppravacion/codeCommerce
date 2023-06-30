import React from "react";
import CART from '../../assets/cart.png'
import TRUCK from '../../assets/truck.png'
import PAYMENT from '../../assets/payment.png'
import STAR from '../../assets/star.png'


export const ProgressBar = (props) => {

  const page = props.miniDisplay


  return(
    <>    
      <div className={`progressBarWrapper `} >
      
        <div className={`statusBubble  completeBubble `}>
          <img src={CART} />
        </div>
        <div className={`bar ${page == 'Shipping' || page == 'Payment' || page == 'Confirmation' ? 'completeBar' : '' }`}>          
        </div>
        <div className={`statusBubble ${page == 'Shipping' || page == 'Payment' || page == 'Confirmation' ? ' completeBubble' : ''}`}>
          <img src={TRUCK} />
        </div>
        <div className={`bar ${page == 'Payment' || page == 'Confirmation' ? 'completeBar' : '' }`}>          
        </div>
        <div className={`statusBubble ${ page == 'Payment' || page == 'Confirmation' ? ' completeBubble' : ''}`}>
          <img src={PAYMENT} />
        </div>
        <div className={`bar ${page == 'Confirmation' ? 'completeBar' : '' }`}>          
        </div>
        <div className={`statusBubble ${page == 'Confirmation' ? ' completeBubble' : ''}`}>
          <img src={STAR} />
        </div>
      </div>
    </>
  )
}

{/* <a href="https://www.flaticon.com/free-icons/shopping-cart" title="shopping cart icons">Shopping cart icons created by Moon.de - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/logistics-delivery" title="logistics delivery icons">Logistics delivery icons created by Moon.de - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/secure-payment" title="secure payment icons">Secure payment icons created by Moon.de - Flaticon</a> */}
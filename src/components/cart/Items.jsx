import React from 'react'


export const Items = (props) => {
  const mainState = props.mainState
  const { allUsers } = props.mainState
  const { currentUserIndex } = props.mainState
  const currentUser = allUsers[currentUserIndex]
  const { cartItems } = props.mainState
  const { cartItems: { bricks, mortar} } = props.mainState

  const handleQTY = (name, Val) => props.changeCartQuantity(name, 'quantity', Val)
  const proceed = () => props.goShipping()
 
  

  return(
    <>   
        
      {Object.values(cartItems).length 
        ? Object.entries(cartItems).map(([key, value]) => (
          <div className="itemWrapper" key={key}>
            <div className='itemImageWrapper'>
              <img src={value.image} />
            </div>
            <div className='itemName'>{value.name}</div>
            <div className='itemPrice'>${value.price} ea.</div>
            <div className="qtyWrapper">
              <div>Quantity: </div>
              <select name={value.name} id={value.name} onChange={(e) => handleQTY(value.name, e.target.value)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
          </div>
        ))
        : null
      }

      <div className="container btnWrapper">
        <button 
          onClick={proceed} 
          disabled={(bricks.quantity > 0 || mortar.quantity > 0) ? false : true}>
          proceed
        </button>  
      </div>      
    </>
  )
}
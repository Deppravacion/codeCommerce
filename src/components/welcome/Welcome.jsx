import React from 'react'
import { useState } from 'react'
import SignIn from '../signIn/SignIn'
import SignUp  from '../signUp/SignUp'


export const Welcome = (props) => {
  const [membership, setMembership] = useState('')

  const onClick = ({target: {id}}) => {
    setMembership(id)
    console.log('membership has been set to : ' + id)
  }
  
  // const handleChange = ({ target: {name, value}}) => {
  //   console.log(name, value);
  // }

  const { mainState } = props
  return (
    <div className="container welcome">
      <div className='radioWrapper'>
        <div>
          <input id="signUp" type="radio" name="radbutton" onClick={onClick} />
          <label htmlFor="signUp"> sign.Up</label>
        </div>
        <div>
          <input id="signIn" type="radio" name="radbutton" onClick={onClick} />
          <label htmlFor="signIn"> sign.In</label>
        </div>          
      </div>
      {membership == 'signIn' && (<SignIn 
        mainState={mainState}
        // handleChange={handleChange}
        onClick={onClick}
        changeDisplayPage={props.changeDisplayPage}
        changeCurrentuserIndex={props.changeCurrentuserIndex}
        
        />)
      }
      {membership == 'signUp' && (<SignUp 
        mainState={mainState}
        // handleChange={handleChange}
        onClick={onClick}
        changeDisplayPage={props.changeDisplayPage}
        changeCurrentuserIndex={props.changeCurrentuserIndex}
        addUser={props.addUser}
        />)
      }
    </div>
  )
}


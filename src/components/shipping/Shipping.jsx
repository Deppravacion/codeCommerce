import React from 'react'
import InputBase from '../inputBase/InputBase'
import {requiredFields} from '../validations'
import MAIL from '../../assets/mail.png'
import CITY from '../../assets/city.png'
import NUMBERS from '../../assets/numbers.png'
import LETTERS from '../../assets/textOnly.png'
import USA from '../../assets/usa.png'
import STREET from '../../assets/street.png'

export class Shipping extends React.Component {

  state = {
    firstName: '', 
    lastName: '', 
    street: '', 
    city: '', 
    state: '',
    zip: '',
    error: {},
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  handleBlur = (e) => {
    console.log('blurrr');
    this.handleValidations(e.target.name, e.target.value)
  } 

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {   

      case 'firstName':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstName: errorText,
          },
        }));
      break;
      case 'lastName':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastName: errorText,
          },
        }));
      break;
      case 'street':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            street: errorText,
          },
        }));
      break;
      case 'state':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            state: errorText,
          },
        }));
      break;
      case 'city':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            city: errorText,
          },
        }));
      break;
      case 'zip':
        errorText = requiredFields(value)               
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zip: errorText,
          },
        }));
      break;    
    default:
      break;
    }
  };

  errorFreeBool = () => Object.values(this.state.error).some(err => err != undefined) ? false : true  

  preSubmitBool = () => {
    let bool = undefined
    let newShipping = {
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      street: this.state.street, 
      city: this.state.city, 
      state: this.state.state,
      zip: this.state.zip,
    }

    if (this.errorFreeBool()) {
      this.props.addShipping(newShipping)
      console.log('errorFree and now we add to shipping. move to payment');
     
      bool = true
    } else {
      return bool = false
    }
    return bool
  }

  handleSetShipping = (e) => {
    e.preventDefault()   
    if (this.preSubmitBool()) {  
     //move to Payment comp
    } 
    return e
  }

  handleShippingSpeed = () => {
    console.log('shippingSPEED setting here');
    this.props.changeExpressSpeed(true)
  }

  proceed = () => this.props.goPayment() 
  goBack = () => this.props.goItems()

  render()  {
  const mainState = this.props.mainState
  const { allUsers } = this.props.mainState
  const { currentUserIndex } = this.props.mainState
  const currentUser = allUsers[currentUserIndex]
  const { cartItems } = this.props.mainState
  const { cartItems: { bricks, mortar} } = this.props.mainState

  const mailIcon = <div className='iconWrapper'><img id='mail' src={MAIL} ></img></div> 
  const streetIcon = <div className='iconWrapper'><img id='street' src={STREET} ></img></div> 
  const textIcon = <div className='iconWrapper'><img id='textIcon' src={LETTERS} ></img></div> 
  const cityIcon = <div className='iconWrapper'><img id='city' src={CITY} ></img></div> 
  const usaIcon = <div className='iconWrapper'><img id='usa' src={USA} ></img></div> 
  const numbersIcon = <div className='iconWrapper'><img id='numbers' src={NUMBERS} ></img></div>
  
    const inputData = [    
      {
        id: 1, 
        type: 'text',
        label: "First Name",
        name: 'firstName', 
        error: 'firstName', 
        icon: textIcon
      },
      {
        id: 2, 
        type: 'text',
        label: "Last Name",
        name: 'lastName', 
        error: 'lastName', 
        icon: textIcon
      },
      {
        id: 3, 
        type: 'text',
        label: "street",
        name: 'street', 
        error: 'street', 
        icon: streetIcon
      },
      {
        id: 4, 
        type: 'text',
        label: "city",
        name: 'city', 
        error: 'city', 
        icon: cityIcon
      },
      {
        id: 5, 
        type: 'text',
        label: "state",
        name: 'state', 
        error: 'state', 
        icon: usaIcon
      },
      {
        id: 6, 
        type: 'text',
        label: "zip",
        name: 'zip', 
        error: 'zip', 
        icon: numbersIcon
      },
    ]    

    return(
      <>       
        <div className="cartLeftBlockBody">        
          <form onSubmit={this.handleSetShipping}>
            <h2>where do you want it?</h2>
            { inputData.length 
              ? inputData.map((item, index) => (                        
                <label key={index} htmlFor={item.id} className='errorLabel'>
                  <InputBase
                    onChange={this.onChange}
                    autoComplete='off'
                    id={item.id}
                    placeholder={item.label}
                    type={item.type}
                    label={item.label}
                    name={item.name}
                    onBlur={this.handleBlur}
                    errorM={
                      this.state.error && 
                      this.state.error[item.error] &&
                      this.state.error[item.error].length > 1 
                        ? this.state.error[item.error]
                        : this.state.error[item.error]
                    }
                  />
                  { item.icon}               
                </label>            
              ))
              : null
            }
            <div> 
              <div className='express'>
                our valued customers get standard shipping for free
                <div className="checkbox">
                  <label htmlFor="express">Express shipping available for $300</label>
                  <input type="checkbox" id="express" name="ships" value='express'  onClick={this.handleShippingSpeed}/>
                </div>                  
              </div>
            </div>         
            <div>
              <button type='submit'> set Shipping </button>
            </div>
          </form>
        </div>
        <div className="container btnWrapper">
        <button 
          onClick={this.goBack} 
          disabled={false}>
          back
        </button>  
        <button 
          onClick={this.proceed}
          disabled={false}>
          proceed
        </button>  
      </div>      
      </>
    )
  }
}
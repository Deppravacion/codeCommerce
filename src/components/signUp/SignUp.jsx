import React, { Component } from 'react'
import { InputBase } from '../inputBase/InputBase'
import { emailContains, passwordLengthCheck, userAlreadyExistsCheck, newPasswords, requiredFields, findUserIndex} from '../validations'
import HIDE from '../../assets/hide.png'
import WITNESS from '../../assets/witness.png'
import MAIL from '../../assets/mail.png'
import CITY from '../../assets/city.png'
import NUMBERS from '../../assets/numbers.png'
import LETTERS from '../../assets/textOnly.png'
import USA from '../../assets/usa.png'
import STREET from '../../assets/street.png'
import { CARTITEMS } from '../constants'

 export class SignUp extends Component {

  state = {
    email: '', 
    password: '', 
    passwordConfirm: '',
    firstName: '', 
    lastName: '', 
    street: '', 
    city: '', 
    state: '',
    zip: '',
    passwordDisplay: false,
    error: {},
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  eyeBlink = () => this.setState({ passwordDisplay: this.state.passwordDisplay ? false : true })


  errorFreeBool = () => Object.values(this.state.error).some(err => err != undefined) ? false : true  

  preSubmitBool = () => {
    const allUsers = this.props.mainState.allUsers
    let bool = undefined
    let newUser = {
      email: this.state.email, 
      password: this.state.password, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      street: this.state.street, 
      city: this.state.city, 
      state: this.state.state,
      zip: this.state.zip,

    }

    if (this.errorFreeBool()) {
      this.props.addUser(newUser)
      bool = true
    } else {
      return bool = false
    }
    return bool
  }

  handleSignUp = (e) => {
    e.preventDefault()
    let email = this.state.email
    console.log(email)
    if (this.preSubmitBool()) {
      const { allUsers } = this.props.mainState     
      this.props.changeDisplayPage('Cart')
      this.props.changeCurrentuserIndex(allUsers.length)
    } 
    return e
  }

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value)

  handleValidations = (type, value) => {
    console.log('validating');
    const allUsers = this.props.mainState.allUsers
    let errorText;
    switch (type) {
      case 'email':
        errorText = 
        emailContains(value) || userAlreadyExistsCheck(value, allUsers) || requiredFields(value)
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            email: errorText,
          },
        }));
      break;
  
      case 'password':
        errorText =
          passwordLengthCheck(value) || requiredFields(value)    
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            password: errorText,
          },
        }));
      break;

      case 'passwordConfirm':
        errorText =
        newPasswords(value, this.state.password)          
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            passwordConfirm: errorText,
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

  render() {
    const witnessIcon = <div  className='iconWrapper' onClick={this.eyeBlink}><img id='witness' src={WITNESS} ></img></div> 
    const hideIcon = <div className='iconWrapper' onClick={this.eyeBlink}><img id='hide' src={HIDE} ></img></div> 
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
        label: "email",
        name: 'email', 
        error: 'email', 
        icon: mailIcon
      },
      {
        id: 2, 
        type: this.state.passwordDisplay ? 'text' : 'password',
        label: "password",
        name: 'password', 
        error: 'password',
        icon: this.state.passwordDisplay ? witnessIcon : hideIcon,
      },
      {
        id: 3, 
        type: this.state.passwordDisplay ? 'text' : 'password',
        label: "passwordConfirm",
        name: 'passwordConfirm', 
        error: 'passwordConfirm',
        icon: this.state.passwordDisplay ? witnessIcon : hideIcon,
      },
      {
        id: 4, 
        type: 'text',
        label: "First Name",
        name: 'firstName', 
        error: 'street', 
        icon: streetIcon
      },
      {
        id: 5, 
        type: 'text',
        label: "Last Name",
        name: 'lastName', 
        error: 'street', 
        icon: streetIcon
      },
      {
        id: 6, 
        type: 'text',
        label: "street",
        name: 'street', 
        error: 'street', 
        icon: streetIcon
      },
      {
        id: 7, 
        type: 'text',
        label: "city",
        name: 'city', 
        error: 'city', 
        icon: cityIcon
      },
      {
        id: 8, 
        type: 'text',
        label: "state",
        name: 'state', 
        error: 'state', 
        icon: usaIcon
      },
      {
        id: 9, 
        type: 'text',
        label: "zip",
        name: 'zip', 
        error: 'zip', 
        icon: numbersIcon
      },
    ]    

    return(
      <>
        <form onSubmit={this.handleSignUp}>
          <h2>signUp to start</h2>
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
            <button type='submit'> sign up </button>
          </div>
        </form>
      </>
    )
  }
}
export default SignUp
import React, { Component } from 'react'
import { InputBase } from '../inputBase/InputBase'
import { emailContains, passwordLengthCheck, findUserIndex, validateUserInfoBool, passwordMatchingExistingCheck} from '../validations'
import HIDE from '../../assets/hide.png'
import WITNESS from '../../assets/witness.png'
import MAIL from '../../assets/mail.png'



export class SignIn extends Component { 

  state = {
    userEmail: '', 
    userPassword: '', 
    passwordDisplay: false,
    error: {},
  }
  
  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  
  handleValidations = (type, value) => {
    console.log('validating');
    let errorText;
    switch (type) {
      case 'userEmail':
        errorText = emailContains(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userEmail: errorText,
          },
        }));
      break;
  
      case 'userPassword':
        errorText =
          passwordLengthCheck(value) ||
          passwordMatchingExistingCheck(this.state.userEmail, this.state.userPassword, this.props.mainState.allUsers)
        
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userPassword: errorText,
          },
        }));
      break;
    default:
      break;
    }
  };

  errorFreeBool = () => {
    return Object.values(this.state.error).some(err => err != undefined) ? false : true
  }

  handleSignIn = (e) => {
    e.preventDefault()
    const { allUsers } = this.props.mainState
    let userEmail = this.state.userEmail
    let userPassword= this.state.userPassword
    console.log('handlesignIN');

    if ( validateUserInfoBool(userEmail, userPassword, allUsers) &&  this.errorFreeBool()) {
      console.log('were good to go ');
      this.props.changeDisplayPage('Cart')
      this.props.changeCurrentuserIndex(findUserIndex(userEmail, allUsers))
    } else {
      console.log('asdfsadfasdfsdffuckfukcfukc')
    }   

  }

  eyeBlink = () => this.setState({ passwordDisplay: this.state.passwordDisplay ? false : true })


  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  render() {
    const  mainState  = this.props.mainState
    const witnessIcon = <div className='iconWrapper' onClick={this.eyeBlink}><img id='witness' src={WITNESS} ></img></div> 
    const hideIcon = <div  className='iconWrapper'onClick={this.eyeBlink}><img id='hide' src={HIDE} ></img></div> 
    const mailIcon = <div className='iconWrapper'><img id='mail' src={MAIL}></img></div>

    const inputData = [
      {
        id: 1,
        type: "text",
        label: "email",
        icon: mailIcon,
        name: "userEmail",
        error: "userEmail",
      },
      {
        id: 2,
        type: this.state.passwordDisplay ? 'text' : 'password',
        label: "password",
        icon: this.state.passwordDisplay ? witnessIcon : hideIcon,
        name: "userPassword",
        error: "userPassword",
        
      },
    ];

    return(
      <div>
       <form onSubmit={this.handleSignIn}>
          <h2>welcome back</h2>
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
            <button type='submit'>sign in </button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default SignIn
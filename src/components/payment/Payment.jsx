import React from "react";
import { OTHERCARDS, INIT_CARD } from "../constants";
import InputBase from "../inputBase/InputBase";
import { cardExpireValidation, cardNumberValidation, onlyTextValidation, securityCodeValidation } from "../validations";
import './Payment.css'

export class Payment extends React.Component {
    state= {
        cardData: INIT_CARD,
        maxLength: OTHERCARDS.length,
        error: {},
        cardType: null,
    }

    findDebitCardType = (cardParm) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
            
        }
        for ( const card in regexPattern) {
            if (cardParm.replace(/[^\d]/g, '').match(regexPattern[card])) return card
        }
        return ''
    }

    handleValidations = (type, value) => {
        let errorText
        switch(type) {
            case 'cardNum':
                errorText = cardNumberValidation(value)
                this.setState((prevState) =>  ({ 
                    cardType: this.findDebitCardType(value),
                    error: {...prevState.error, cardError: errorText }}))
           
                break
            case 'cardHolder':
                errorText = onlyTextValidation(value)
                this.setState((prevState) => ({ error: { ...prevState.error, cardHolderError: errorText}}))
                
                break
            case 'exDate':
                errorText = cardExpireValidation(value)
                this.setState((prevState) => ({ error: { ...prevState.error, exDateError: errorText}}))
                break
            case 'secCode':
                errorText = securityCodeValidation(3, value)
                this.setState((prevState) => ({ error: { ...prevState.error, secCodeError: errorText}}))
                break
            default:
                break
        }

    }

    handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value)


    handleInputData = ({ target: { name, value}}) => {

        if (name === 'cardNum') {
            let mask = value.split(' ').join('')
            if (mask.length) {
                mask = mask.match( new RegExp('.{1,4}', 'g')).join(' ')
                this.setState((prevState) => ({ 
                    cardData: { 
                        ...prevState.cardData, 
                        [name]: mask, 
                    }
                }))
            } else {
                this.setState((prevState) => ({ 
                    cardData: { 
                        ...prevState.cardData, 
                        [name]: '' 
                    }
                }))
            }
        } else {
            this.setState((prevState) => ({ 
                cardData: { 
                    ...prevState.cardData, 
                    [name]: value 
                }
            }))
        }
    }

    checkErrorForSave = () => {
        const { cardData } = this.state
        let errorValue = {}
        let isError = false


        Object.keys(cardData).forEach((val) => {
            if ( !cardData[val].length) {
                errorValue = {...errorValue, [`${val}Error`]: 'Required'}
                isError = true
            }
        })
        this.setState( { error: errorValue })
        return isError
    }
    

    handleAddCard = (e) => {
        e.preventDefault() 
        const errorCheck = this.checkErrorForSave()
        if (!errorCheck) {
            //set parent state to the cardData
            console.log(this.state.cardData);
            this.props.addPayment(this.state.cardData, 
                this.props.cardTypeDrill(this.state.cardType)
            //     this.setState({ 
            //     cardData: INIT_CARD, 
            //     cardType: null,
            // })
            )
        }
    }

    proceed = () => this.props.goConfirmation()
    goBack = () => this.props.goShipping();

    render() {
        const { cardData, maxLength, cardType, error } = this.state
        const inputData = [
            { placeholder: 'Card Number', name: 'cardNum', type:'text', error: 'cardNumError' },
            { placeholder: 'Card Holder\'s', name: 'cardHolder', type:'text', error: 'cardHolderError'},
            { placeholder: 'Expiration Date (MM/YY)', name: 'exDate', type:'text', error: 'exDateError'},
            { placeholder: 'Security Code', name: 'secCode', type:'text', error: 'secCodeError'}
   
        ]
        return(
            <>
                <div className="cartLeftBlockBody">      
                <h3>Add Payment</h3>
                <form onSubmit={this.handleAddCard}>
                    {inputData.length 
                        ? inputData.map((item, index) => (
                            <label key={index} htmlFor={item.id} className='errorLabel'>

                                <InputBase                                 
                                placeholder={item.placeholder}
                                type={item.type}
                                value={cardData && cardData[item.name]}
                                onChange={this.handleInputData}
                                autoComplete='off'
                                maxLength={maxLength}
                                id={item}
                                key={index}
                                name={item.name}
                                onBlur={this.handleBlur}
                                isCard={item.name === 'cardNum'}
                                error={error}
                                cardType={cardType}
                                errorM={
                                    (this.state.error
                                        && error[item.error]
                                        && error[item.error].length > 1)
                                        ? error[item.error]
                                        : null
                                    }
                                    />
                            </label>
                            )) 
                        : null
                    }      
                    <div>                       
                        <button type='submit'> Add Card</button>
                    </div>
                </form>
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
                </div>
            </>
        )
    }
}

export default Payment
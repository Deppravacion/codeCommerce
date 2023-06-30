import moment from "moment/moment"  

export const cardNumberValidation = (cardNumber) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        
    }
    for ( const card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
            if (cardNumber) {
                return cardNumber 
                && /^[1-6]{1}[0-9]{14,15}$/i
                .test(cardNumber.replace(/[^\d]/g, '')
                .trim())
                ? '' 
                : 'Enter a valid Card'
            }
        }
    }
    return 'Enter a valid Card'    
}

export const cardExpireValidation = (value) => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
            let today = new Date()
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(),
                today.getMonth() + 1, 0).getDate()} `
                let currentDate = moment(new Date(date))
                let visaValue = value.split('/')
                let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0)
                return currentDate < moment(visaDate)
                    ? undefined
                    : 'Please Enter a Valid Date'
        } else {
            return 'Invalid Date Format'
        }
    }
}

export const emailContains = (value) => {
    const regex = /@.*\.com$/;
    if (value.length > 0) {
      if (regex.test(value)) {
        return undefined;
      } else return 'Invalid Email Format';
    }
}

export const passwordLengthCheck = (value) => {
    let error = (value.length > 0 && value.length < 6) 
    ?  'Password must be longer'
    : undefined
    return error
}

export const passwordMatchingExistingCheck = (email, password, allUsers) => {
    let currentUser = allUsers[findUserIndex(email, allUsers)]
    let error = password === currentUser.password 
        ? undefined 
        : 'incorrect password'
    return error
}

export const requiredFields = (value) => {
    let error
    return error = value.length == 0 ? ' must fill in this field' : undefined 
}

export const newPasswords = (value, test) => {
    let error
    return error = (value == test) ? undefined : 'passwords do not match'
}

export const findUserIndex = (email, allUsers) => {
    console.log(allUsers);
    return allUsers.findIndex((elm) => elm.email == email)  
} 

export const userAlreadyExistsCheck = (email, allUsers) => {
    let currentUserIndex = findUserIndex(email, allUsers)
    let error
    return error = (currentUserIndex === -1) ? undefined : ' user Exists'
}

export const validateUserInfoBool = (email, password, allUsers) => {
    const currentUser = allUsers[findUserIndex(email, allUsers)]
    return currentUser.password === password ? true : false
}

export const onlyTextValidation = (value) => {
    if (value) {
        if (/^[a-zA-Z\s]*$/i.test(value)) {
            return undefined
        } else {
            return 'Alphabetical Letters Only'
        }
    } else {
        return undefined
    }
}

export const securityCodeValidation = (min, value) => 
(value && value.length < min ) ? 'Must be three characters or more' : undefined
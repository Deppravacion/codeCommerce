import VISA_ICON from '../assets/visa.png'
import AMERICAN_EXPRESS_ICON from '../assets/amex.png'
import DISCOVER_ICON from '../assets/discover.png'
import MASTER_CARD_ICON from '../assets/masterCard.png'
import BRICKS from '.././assets/brick.png'
import MORTAR from '.././assets/build.png'


export const OTHERCARDS = [
    /[1-9]/, 
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,    
]

export const AMERICANEXPRESS = [
    /[1-9]/, 
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
]

export const INIT_CARD = {
    cardNum: '', 
    cardHolder: '', 
    exDate: '', 
    secCode: ''
}

export const CARD = [
    'VISA', 
    'MASTERCARD', 
    'AMERICAN_EXPRESS',
    'DISCOVER'
]

export const CARDICON = {
    VISA: VISA_ICON,
    MASTERCARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
    DISCOVER: DISCOVER_ICON
}

export const ALLUSERS = [
    {
      email: 'default@estore.com', 
      password: 'Password123', 
      firstName: 'John', 
      lastName: 'Denver',     
      street: '2001 Blake St', 
      city: 'Denver', 
      state: 'CO',
      zip: '80205',
    },
]

export const CARTITEMS = {
    bricks: { 
        id: 1, 
        name: 'bricks', 
        price: 250, 
        quantity: 0, 
        image: BRICKS, 
        get total() { 
            return this.price * this.quantity 
        },
    },
    mortar: { 
        id: 2, 
        name: 'mortar', 
        price: 100, 
        quantity: 0, 
        image: MORTAR ,
        get total() { 
            return this.price * this.quantity 
        },
    },

}
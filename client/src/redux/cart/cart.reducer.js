import {CartActionTypes} from './cart.types'
import { addItemToCart, clearItemFromCart, removeItemToCart } from './cart.utils'

const INTIAL_STATE = {
    hidden: true,
    cartItems: [],
    error: ''
};

const cartReducer = (state = INTIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: clearItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                hidden: true, 
                cartItems: [],
                error: ''
            }
        case CartActionTypes.CLEAR_CART_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;
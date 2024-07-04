import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstant";

export const cartReducer = (state = {cartItems: [], shippingInfo: {}}, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const itemExist = state.cartItems.find((value) => item.product === value.product);
            if(itemExist) {
                return{
                    ...state,
                    cartItems: state.cartItems.map((value) => value.product === itemExist.product ? item : value)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter((value) => value.product !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload
            }
        default :
            return state
    }
};
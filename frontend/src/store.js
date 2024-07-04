import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { forgotPasswordReducer, profileReducer, userReducer, usersReducer } from "./reducers/UserReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReducer, productUpdateDeleteReducer, productDetailsReducer, productsReducer, reviewCreateUpdateReducer } from "./reducers/ProductReducer";
import { orderDetailsReducer, orderUpdateDeleteReducer, ordersReducer } from "./reducers/OrderReducer";
import { cartReducer } from "./reducers/CartReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    usersReducer: usersReducer,
    profileReducer: profileReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cartReducer: cartReducer,
    ordersReducer: ordersReducer,
    orderDetailsReducer: orderDetailsReducer,
    orderUpdateDeleteReducer: orderUpdateDeleteReducer,
    productsReducer: productsReducer,
    productDetailsReducer: productDetailsReducer,
    productCreateReducer: productCreateReducer,
    productUpdateDeleteReducer: productUpdateDeleteReducer,
    reviewCreateUpdateReducer: reviewCreateUpdateReducer,
})

let initialState = {
    cartReducer: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {} 
    }
};

const middleWare = [thunk];

const store = legacy_createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
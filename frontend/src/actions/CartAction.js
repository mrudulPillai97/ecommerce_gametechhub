import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstant";
import axios from "axios";
const baseUrl = "https://e-shopify-22tz.onrender.com";

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/product/${productId}`);

    dispatch({ type: ADD_TO_CART, payload: {
        product: data.product._id,
        name: data.product.name,
        metal: data.product.metal,
        collection: data.product.collection,
        price: data.product.price,
        discountPrice: data.product.discountPrice,
        discountPercent: data.product.discountPercent,
        image: data.product.images[0].imageUrl,
        stock: data.product.stock,
        quantity
    } });

    localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems))
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });

    localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems))
};

export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};
import { ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQUEST, ADMIN_UPDATE_ORDER_SUCCESS, CANCEL_ORDER_FAIL, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDERS_FAIL, ORDERS_REQUEST, ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/OrderConstant";
import axios from "axios";
const baseUrl = "https://e-shopify-22tz.onrender.com";

export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDERS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${baseUrl}/api/v1/orders/me`);

        dispatch({ type: ORDERS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ORDERS_FAIL, payload: error.response.data.error });
    }
};


export const getOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${baseUrl}/api/v1/order/${orderId}`);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.error });
    }
};

export const getOrdersAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDERS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${baseUrl}/api/v1/admin/orders`);

        dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_ORDERS_FAIL, payload: error.response.data.error });
    }
};

export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        axios.defaults.withCredentials = true;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', baseUrl);
        const config = {
            mode: 'cors',
            credentials: 'include',
            headers: headers,
        }

        const { data } = await axios.post(`${baseUrl}/api/v1/order/new`, orderData, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.error });
    }
};

export const cancelOrder = (orderId, newStatus) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        axios.defaults.withCredentials = true;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', baseUrl);
        const config = {
            mode: 'cors',
            credentials: 'include',
            headers: headers,
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/order/${orderId}/cancel`, {newStatus}, config);

        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: CANCEL_ORDER_FAIL, payload: error.response.data.error });
    }
};

export const deleteOrderAdmin = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_ORDER_REQUEST });
        axios.defaults.withCredentials = true;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', baseUrl);
        const config = {
            mode: 'cors',
            credentials: 'include',
            headers: headers,
        }

        const { data } = await axios.delete(`${baseUrl}/api/v1/admin/order/${orderId}/delete`, config);

        dispatch({ type: ADMIN_DELETE_ORDER_SUCCESS, payload: data.message });
    } 
    catch(error) {
        dispatch({ type: ADMIN_DELETE_ORDER_FAIL, payload: error.response.data.error });
    }
};

export const updateOrderAdmin = (orderId, orderData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST });
        axios.defaults.withCredentials = true;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', baseUrl);
        const config = {
            mode: 'cors',
            credentials: 'include',
            headers: headers,
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/admin/order/${orderId}/update`, {orderData}, config);

        dispatch({ type: ADMIN_UPDATE_ORDER_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_UPDATE_ORDER_FAIL, payload: error.response.data.error });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
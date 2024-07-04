import { ADMIN_CREATE_PRODUCT_FAIL, ADMIN_CREATE_PRODUCT_REQUEST, ADMIN_CREATE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCT_FAIL, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_SUCCESS, CLEAR_ERRORS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, PRODUCTS_FAIL, PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/ProductConstant";
import axios from "axios";
const baseUrl = "https://e-shopify-22tz.onrender.com";

export const getProducts = (search = "", sort = "", collection = "", page = 1) => async (dispatch) => {
    let url = `${baseUrl}/api/v1/products?page=${page}`;

    // Adding search parameter if provided
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }

    // Adding sort parameter if provided
    if (sort) {
        url += `&sort=${sort}`;
    }

    // Adding collection parameter if provided
    if (collection) {
        url += `&collection=${encodeURIComponent(collection)}`;
    }
    // if (categories && categories.length > 0) {
    //     categories.forEach(category => {
    //         url += `&categories[]=${encodeURIComponent(category)}`;
    //     });
    // }

    try {
        dispatch({ type: PRODUCTS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(url);

        dispatch({ type: PRODUCTS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: PRODUCTS_FAIL, payload: error.response.data.error });
    }
};

export const getProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${baseUrl}/api/v1/product/${productId}`);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.error });
    }
};

export const getProductsAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${baseUrl}/api/v1/admin/products`);

        dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: error.response.data.error });
    }
};

export const createProductAdmin = (productData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });
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

        const { data } = await axios.post(`${baseUrl}/api/v1/admin/product/new`, productData, config);

        dispatch({ type: ADMIN_CREATE_PRODUCT_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_CREATE_PRODUCT_FAIL, payload: error.response.data.error });
    }
};

export const updateProductAdmin = (productId, productData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });
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

        const { data } = await axios.put(`${baseUrl}/api/v1/admin/product/${productId}/update`, productData, config);

        dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_UPDATE_PRODUCT_FAIL, payload: error.response.data.error });
    }
};

export const deleteProductAdmin = (productId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(`${baseUrl}/api/v1/admin/product/${productId}/delete`);

        dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL, payload: error.response.data.error });
    }
};

export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        axios.defaults.withCredentials = true;
        const config = {
            headers: { "Content-Type": "application/json" },
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/product/${reviewData.productId}/review/write`, reviewData, config);

        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } 
    catch(error) {
        dispatch({ type: CREATE_REVIEW_FAIL, payload: error.response.data.error });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
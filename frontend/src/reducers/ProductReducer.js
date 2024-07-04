import { ADMIN_CREATE_PRODUCT_FAIL, ADMIN_CREATE_PRODUCT_REQUEST, ADMIN_CREATE_PRODUCT_RESET, ADMIN_CREATE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_RESET, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCT_FAIL, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_RESET, ADMIN_UPDATE_PRODUCT_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_RESET, CREATE_REVIEW_SUCCESS, PRODUCTS_FAIL, PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/ProductConstant";
import { CLEAR_ERRORS } from "../constants/ProductConstant";

export const productsReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
};

export const productDetailsReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
}

export const productCreateReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case ADMIN_CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case ADMIN_CREATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_CREATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
};

export const productUpdateDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ADMIN_UPDATE_PRODUCT_REQUEST:
        case ADMIN_DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }
        case ADMIN_UPDATE_PRODUCT_FAIL:
        case ADMIN_DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_UPDATE_PRODUCT_RESET:
        case ADMIN_DELETE_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
};

export const reviewCreateUpdateReducer = (state = {review: {}}, action) => {
    switch(action.type) {
        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
};
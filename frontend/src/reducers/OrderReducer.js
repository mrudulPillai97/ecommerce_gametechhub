import { ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_RESET, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQUEST, ADMIN_UPDATE_ORDER_RESET, ADMIN_UPDATE_ORDER_SUCCESS, CANCEL_ORDER_FAIL, CANCEL_ORDER_REQUEST, CANCEL_ORDER_RESET, CANCEL_ORDER_SUCCESS, ORDERS_FAIL, ORDERS_REQUEST, ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/OrderConstant";
import { CLEAR_ERRORS } from "../constants/ProductConstant";

export const ordersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case ORDERS_REQUEST:
        case ADMIN_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ordersCount: action.payload.ordersCount
            }
        case ADMIN_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ordersCount: action.payload.ordersCount
            }
        case ORDERS_FAIL:
        case ADMIN_ORDERS_FAIL:
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

export const orderDetailsReducer = (state = {order: {}}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload.order,
            }
        case ORDER_DETAILS_FAIL:
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


export const orderUpdateDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ADMIN_UPDATE_ORDER_REQUEST:
        case ADMIN_DELETE_ORDER_REQUEST:
        case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_UPDATE_ORDER_SUCCESS:
        case ADMIN_DELETE_ORDER_SUCCESS:
        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }
        case ADMIN_UPDATE_ORDER_FAIL:
        case ADMIN_DELETE_ORDER_FAIL:
        case CANCEL_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_UPDATE_ORDER_RESET:
        case ADMIN_DELETE_ORDER_RESET:
        case CANCEL_ORDER_RESET:
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
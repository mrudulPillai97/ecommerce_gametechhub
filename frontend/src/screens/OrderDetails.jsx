import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cancelOrder, clearErrors, getOrderDetails } from "../actions/OrderAction";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import { CANCEL_ORDER_RESET } from "../constants/OrderConstant";


const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { loading: orderLoading, error, order } = useSelector(state => state.orderDetailsReducer);
    const { loading, error: updateError, success, message } = useSelector(state => state.orderUpdateDeleteReducer);

    const handleCancelOrder = () => {
        const newStatus = order?.orderStatus === "Processing" ? "Cancelled" : "";
        console.log(newStatus);
        dispatch(cancelOrder(orderId, newStatus))
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(message);
            console.log(order);
            dispatch({ type: CANCEL_ORDER_RESET });
        }
    }, [loading, orderLoading, error, updateError, order, message, success, dispatch, orderId]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }
    );

    return (
        <>
            {
                orderLoading === true ? <Loader /> :
                !order ? <PageNotFound /> : 
                order && <div className="w-full text-gray-900">
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-4 py-4">
                        <h2 className="text-2xl font-light px-4">Order# - {order._id}</h2>
                        <div className="col-span-1 bg-gray-50 shadow p-4">
                            <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
                            <div>
                                <div className="flex">
                                    <span>{order.user?.name}</span>
                                </div>
                                <div className="flex">
                                    <span>{order.shippingInfo?.phoneNumber}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>{`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.pincode}, ${order.shippingInfo?.country}`}</span>
                                    <span>{order.shippingInfo?.landmark}</span>
                                </div>
                            </div>                    
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 bg-gray-50 shadow p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold mb-2">Order Status</h2>
                                    {order?.orderStatus === "Processing" && <button disabled={loading ? true : false} onClick={handleCancelOrder} type="submit" className="active:scale-95 rounded text-sm py-1 px-4 font-semibold bg-teal-400 text-white hover:bg-teal-500 duration-150 ease-in-out">
                                            Cancel Order  
                                    </button>}
                                </div>
                                <div className="flex-grow">
                                    <p className="flex items-center gap-2">
                                        <p className={`h-3 w-3 rounded-full ${order?.orderStatus === "Delivered" ? "bg-green-600" : order?.orderStatus === "Shipped" ? "bg-blue-600" : order?.orderStatus === "Cancelled" ? "bg-red-600" : order?.orderStatus === "Processing" ? "bg-orange-600" : ""}`}></p>
                                        <p className="font-semibold">{order?.orderStatus === "Delivered" ? `${order.orderStatus} on ${order?.deliveredAt.slice(0,10)} (${order?.deliveredAt.slice(11, 16)})` : order?.orderStatus === "Shipped" ? `${order?.orderStatus} on ${order?.shippedAt.slice(0, 10)} (${order?.shippedAt.slice(11, 16)})` : order?.orderStatus === "Cancelled" ? `${order?.orderStatus} on ${order?.cancelledAt.slice(0, 10)} (${order?.cancelledAt.slice(11, 16)})` : order?.orderStatus}</p>
                                    </p>
                                    <p className="text-sm">
                                        {order?.orderStatus === "Delivered" ? "Your order has been delivered." : order?.orderStatus === "Shipped" ? "Your order has been shipped." : order?.orderStatus === "Cancelled" ? "Your order has been cancelled." : order?.orderStatus === "Processing" ? "Your order is under processing." : "" }
                                    </p>
                                </div>                   
                            </div>
                            <div className="col-span-1 bg-gray-50 shadow p-4">
                                <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                                <div className="flex-grow">
                                    <p>{order.paymentInfo?.method} - {order.paymentInfo?.method === "card" || "Card" ? "PAID" : "Not Paid"}</p>
                                    <p>Order Amount - Rs. {order?.totalPrice}</p>
                                </div>                   
                            </div>
                        </div>
                        {
                            order.orderItems && order.orderItems.map((order) => (
                                <div key={order._id} className="rounded border flex items-start justify-between p-2 gap-4">
                                    <img className="sm:w-24 sm:h-24 w-20 h-20 object-contain rounded" src={order.image} alt="productImage" />
                                    <div className="flex-1 grid grid-cols-4">
                                        <div className="col-span-2 pt-2">
                                            <p className="">{order.name}</p>
                                        </div>
                                        <div className="col-span-1 pt-2">
                                            <p className="font-semibold">Rs {order.discountPrice}</p>
                                        </div>
                                        <div className="col-span-1 pt-2">
                                            <p className="font-semibold">Quantity {order.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div>
                            
                        </div>
                    </div>
                </div> 
            }
        </>
    )
}

export default OrderDetails;
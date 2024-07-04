import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import NoOrders from "./NoOrders";
import { clearErrors, getOrders } from "../actions/OrderAction";
import toast from "react-hot-toast";


const Orders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders, ordersCount } = useSelector(state => state.ordersReducer);

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        // dispatch(getOrders());
    }, [loading, error, orders, dispatch]);
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])
    return (
        <>
            {
                loading === true ? <Loader /> :
                orders && orders.length === 0 ? <NoOrders /> :
                <div className="w-full text-gray-900">
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-4 py-4">
                        {
                            orders && orders.map((order) => (
                                <Link to={`/account/order/${order._id}`} key={order._id} className="rounded border hover:shadow grid grid-cols-3 p-2 gap-4">
                                    {/* <img className="sm:w-24 sm:h-24 w-20 h-20 object-contain rounded" src={order.image} alt="productImage" /> */}
                                    <p>Order# {order._id}</p>
                                    <div className="flex-grow pt-2">
                                        <p className="font-semibold">Rs {order.totalPrice}</p>
                                    </div>
                                    <div className="flex-grow pt-2">
                                        <p className="flex items-center gap-2">
                                            <p className={`h-3 w-3 rounded-full ${order?.orderStatus === "Delivered" ? "bg-green-600" : order?.orderStatus === "Shipped" ? "bg-blue-600" : order?.orderStatus === "Cancelled" ? "bg-red-600" : order?.orderStatus === "Processing" ? "bg-orange-600" : ""}`}></p>
                                            <p className="font-semibold">{order?.orderStatus === "Delivered" ? `${order.orderStatus} on ${order?.deliveredAt.slice(0,10)} (${order?.deliveredAt.slice(11, 16)})` : order?.orderStatus === "Shipped" ? `${order?.orderStatus} on ${order?.shippedAt.slice(0, 10)} (${order?.shippedAt.slice(11, 16)})` : order?.orderStatus === "Cancelled" ? `${order?.orderStatus} on ${order?.cancelledAt.slice(0, 10)} (${order?.cancelledAt.slice(11, 16)})` : order?.orderStatus}</p>
                                        </p>
                                        <p className="text-sm">
                                            {order?.orderStatus === "Delivered" ? "Your order has been delivered." : order?.orderStatus === "Shipped" ? "Your order has been shipped." : order?.orderStatus === "Cancelled" ? "Your order has been cancelled." : order?.orderStatus === "Processing" ? "Your order is under processing." : "" }
                                        </p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Orders;
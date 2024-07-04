import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { clearErrors, getOrdersAdmin } from "../../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/MetaData";

const OrdersList = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const { error, orders } = useSelector(state => state.ordersReducer);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if(error) {
        toast.error(error);
        dispatch(clearErrors());
        }
        dispatch(getOrdersAdmin());
    }, [dispatch, error]);

    useEffect(() => {
        setFilteredOrders(orders.filter(order =>
        order.user.toLowerCase().includes(searchQuery.toLowerCase()) || order._id.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [orders, searchQuery]);

    return (
        <div>
            <MetaData title="Orders" />
            <h1 className="inline-block text-2xl font-bold text-black">Orders</h1>
            <div className="w-1/3 flex my-4">
                <input
                type="text"
                placeholder="Search orders by id"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block"
                />
            </div>
            <table className="w-full text-left border">
                <thead>
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr.No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders && (searchQuery ? filteredOrders : orders).map((order, index) => (
                    <tr className="hover:bg-gray-200 odd:bg-gray-50 even:bg-gray-100" key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap">Rs {order.totalPrice}</td>
                        <td className={`px-6 py-4 whitespace-nowrap ${order.orderStatus === "Delivered" ? "text-green-600" : order.orderStatus === "Shipped" ? "text-blue-600" : order.orderStatus === "Processing" ?  "text-orange-600" : order.orderStatus === "Cancelled" ? "text-red-600" : ""}`}>{order.orderStatus}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => navigate(`/account/admin/order/${order._id}/update`)} className="text-slate-700 hover:text-slate-800"><MdEdit /></button>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersList;
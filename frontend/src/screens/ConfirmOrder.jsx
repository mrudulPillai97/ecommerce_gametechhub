import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import logo  from "../assets/eshopifyLogo.png";
import MetaData from "../components/MetaData.js";

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cartReducer);
    const { user } = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shippingPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0) > 2000 ? 0 : 199 ;
    const taxPrice = 0;
    const subTotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const itemsPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0);
    const totalPrice = shippingPrice + cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0);
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`
    const landmark = shippingInfo.landmark;
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [loading, setLoading] = useState(false);
    const baseUrl = "https://e-shopify-22tz.onrender.com";

    const handleSubmit = async () => {

        const { data:{keyId} } = await axios.get(`${baseUrl}/api/v1/payment/key`);

        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', baseUrl);
        const config = {
            mode: 'cors',
            credentials: 'include',
            headers: headers,
        }
        
        try {
            const amount = shippingPrice + cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0)
            const { data:{order} } = await axios.post(`${baseUrl}/api/v1/payment/process`, {amount}, config);
            console.log(order);
            const options = {
                key: keyId, 
                amount: order.amount,
                currency: "INR",
                name: "E-Shopify",
                description: "An e-commerce electronic store.",
                image: logo,
                order_id: order.id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order.id,
                        razorPayPaymentId: response.razorpay_payment_id,
                        razorPayOrderId: response.razorpay_order_id,
                        razorPaySignature: response.razorpay_signature,
                    };
                    let headers = new Headers();

                    headers.append('Content-Type', 'application/json');
                    headers.append('Accept', 'application/json');
                    headers.append('Origin', baseUrl);
                    const config = {
                        mode: 'cors',
                        credentials: 'include',
                        headers: headers,
                    }
    
                    const paymentResponse = await axios.post(`${baseUrl}/api/v1/payment/verify`, data, config);
                    if(paymentResponse.data?.success === true) {
                        let headers = new Headers();

                        headers.append('Content-Type', 'application/json');
                        headers.append('Accept', 'application/json');
                        headers.append('Origin', baseUrl);
                        const config = {
                            mode: 'cors',
                            credentials: 'include',
                            headers: headers,
                        }
                        const orderData = {
                            shippingInfo,
                            orderItems: cartItems,
                            paymentInfo: {
                                id: paymentResponse.data?.razorPayDetails?.razorPayPaymentId,
                                method: paymentMethod,
                                status: "PAID",
                            },
                            itemsPrice,
                            taxPrice,
                            shippingPrice,
                            totalPrice
                        }
                        
                        setLoading(true);
                        const orderResponse = await axios.post(`${baseUrl}/api/v1/order/new`, orderData, config);
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000)
                        if(orderResponse.data.success === true) {
                            localStorage.removeItem("cartItems");
                            navigate(`/order/success?reference=${orderResponse.data?.order?.paymentInfo?.id}`);
                        }
                        else {
                            toast.error("Facing problem with creating order. Please try again.");
                        }
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phoneNumber
                },
                notes: {
                    address: "E-Shopify"
                },
                theme: {
                    color: "#00FFFF"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            toast.error(error);
        }
    };

    return(
        <>
        <MetaData title="Confirm Order" />
        <div className="w-full text-gray-900">
            <div className="max-w-[1200px] mx-auto grid sm:grid-cols-3 grid-cols-1 gap-8 py-4">
                <div className="sm:col-span-2 col-span-1">
                    <div className="bg-gray-50 shadow p-4">
                        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
                        <div>
                            <div className="flex">
                                <p className="w-1/4 font-semibold">Name:&nbsp;</p>
                                <span className="w-1/2">{user?.name}</span>
                            </div>
                            <div className="flex">
                                <p className="w-1/4 font-semibold">Phone Number:&nbsp;</p>
                                <span className="w-1/2">{shippingInfo?.phoneNumber}</span>
                            </div>
                            <div className="flex">
                                <p className="w-1/4 font-semibold">Address:&nbsp;</p>
                                <div>
                                <p className="w-1/2">{address}</p>
                                <p className="w-1/2">{landmark}</p>
                                </div>
                            </div>
                        </div>                    
                    </div>

                    <div className="bg-gray-50 shadow p-4 mt-8">
                        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
                        {cartItems.map((product) => (
                            <div key={product.product} className="bg-gray-50 mb-2 p-2 shadow flex items-center justify-between rounded gap-2">
                                <img className="sm:w-24 sm:h-24 w-20 h-20 object-contain rounded" src={product.image} alt="productImage" />
                                <div className="flex mb-2 flex-1">
                                    <div className="flex flex-col justify-between ml-2">
                                        <div>
                                            <p className="sm:text-lg text-sm text-gray-900 font-normal">{product.name}</p>
                                        </div>
                                        <p className="text-gray-900 text-lg">
                                            <span className="font-medium">₹{product.discountPrice}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="text-sm">Quantity</p>
                                    <p className="font-semibold mx-4">{product.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="rounded shadow bg-gray-50 p-2">
                        <h2 className="text-xl text-gray-900 font-semibold">Order Summary</h2>

                        <div className="my-3">
                            <div className="flex items-center justify-between text-gray-900 leading-7">
                                <p>Sub Total</p>
                                <p>
                                    {cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-gray-900 leading-7">
                                <p>Discount</p>
                                <p className="">
                                    - {cartItems.reduce((acc, item) => acc + (item.quantity * (item.price - item.discountPrice)), 0)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-gray-900 leading-7">
                                <p>Shipping Charges</p>
                                <p>{shippingPrice}</p>
                            </div>
                        </div>
                                
                        <div className="flex items-center justify-between font-semibold text-md text-gray-900 py-3 my-3 border-t border-gray-300">
                            <p>Total <span className="text-sm">(in indian currency)</span></p>
                            <p>
                                Rs {shippingPrice + cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0)}
                            </p>
                        </div>

                        <div className="">
                       
                            <div className="w-full my-3">
                                <button disabled={loading === true ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded text-sm py-2 font-semibold bg-teal-400 text-black hover:bg-teal-500 duration-150 ease-in-out">{
                                    loading === true ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : paymentMethod === "Card" ? "Pay and Order" : "Order"
                                }</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ConfirmOrder;
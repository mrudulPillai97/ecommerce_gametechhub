import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartAction.js";
import MetaData from "../components/MetaData.js";

const Cart = () => {
    
    const { cartItems } = useSelector(state => state.cartReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = false;
    const shippingCharges = cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0) > 2000 ? 0 : 199 ;

    const decreaseQuantity = (productId, quantity, stock) => {
        let newQuantity = quantity - 1;
        if(newQuantity < 1) {
            return
        }
        dispatch(addToCart(productId, newQuantity));
    }
    const increaseQuantity = (productId, quantity, stock) => {
        let newQuantity = quantity + 1;
        if(newQuantity >= stock || newQuantity > 4) {
            return 
        }
        dispatch(addToCart(productId, newQuantity));
    }

    const handleCheckout = () => {
        navigate("/login?redirect=shipping");
    }

    return (
        <>
            <MetaData title="My Cart" />
            {!cartItems || cartItems.length <= 0 ? <EmptyCart /> : <div className="w-full text-gray-900">
                <div className="max-w-[1200px] mx-auto grid sm:grid-cols-3 grid-cols-1 gap-8 py-4">
                    <div className="sm:col-span-2 col-span-1">
                        {cartItems && cartItems.map((product) => (
                            <div key={product.product} className="bg-gray-50 mb-2 p-2 shadow flex items-center justify-between rounded gap-2">
                                <img className="sm:w-24 sm:h-24 w-20 h-20 object-contain rounded" src={product.image} alt="productImage" />
                                <div className="flex mb-2 flex-1">
                                    <div className="flex flex-col justify-between ml-2">
                                        <div>
                                            <p className="sm:text-lg text-sm text-gray-900 font-normal">{product.name}</p>
                                        </div>
                                        <p className="text-gray-900 text-lg">
                                            <span className="font-medium">Rs {product.discountPrice}</span>
                                            <span className="text-gray-400 text-[14px] font-medium line-through mx-2">Rs {product.price}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center font-thin bg-white border rounded p-1">
                                    <button disabled={product.quantity <= 1 ? true : false}>
                                        <AiOutlineMinus onClick={() => decreaseQuantity(product.product, product.quantity, product.stock)} size={18} className={product.quantity <= 1 ? "text-gray-300" : "cursor-pointer"} />
                                    </button>
                                    <p className="font-semibold mx-4">{product.quantity}</p>
                                    <button disabled={(product.quantity >= 4 || product.quantity === product.stock) ? true : false}>
                                        <AiOutlinePlus onClick={() => increaseQuantity(product.product, product.quantity, product.stock)} size={18} className={(product.quantity >= 4 || product.quantity === product.stock) ? "text-gray-300" : "cursor-pointer"} />
                                    </button>
                                </div>

                                <button onClick={() => dispatch(removeFromCart(product.product))} className="text-red-700 hover:text-red-800 hover:scale-105 duration-200 ease-in-out"><MdDeleteOutline size={24} /></button>
                            </div>
                        ))}
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
                                    <p>{shippingCharges}</p>
                                </div>
                            </div>
                                    
                            <div className="flex items-center justify-between font-semibold text-md text-gray-900 py-3 my-3 border-t border-gray-300">
                                <p>Total <span className="text-sm">(in indian currency)</span></p>
                                <p>
                                    Rs {shippingCharges + cartItems.reduce((acc, item) => acc + (item.quantity * item.discountPrice), 0)}
                                </p>
                            </div>

                            <button onClick={handleCheckout} type="submit" className="active:bg-cyan-500 active:scale-95 w-full rounded-md text-sm py-2 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">{
                                loading ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Checkout"
                            }</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Cart;
import React from "react";
import { Link } from "react-router-dom";
import Bag from "../assets/Empty_Cart.webp";

const EmptyCart = () => {

    return(
        <div className="h-[91vh] w-full flex flex-col items-center justify-center">
            <img className="max-w-[300px] md:max-w-[400px]" src={Bag} alt="bag" />
            <h1 className="font-medium text-3xl mb-4 text-center">Your cart is empty</h1>
            <Link to={"/products"} className="rounded-md bg-cyan-400 text-white font-medium px-4 py-2">Shop Now</Link>
        </div>
    )
}

export default EmptyCart;
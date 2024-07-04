import React from "react";
import { Link } from "react-router-dom";

const NoOrders = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <h1 className="mb-2 text-5xl font-bold text-gray-900 text-center">No Order</h1>
            <h1 className="text-md mb-6 text-gray-700 text-center">You haven't order anything yet. To order navigate to Home.</h1>
            
            <Link to={"/"} className="rounded-md text-sm py-2 px-6 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">Home</Link>
        </div>
    )
}

export default NoOrders;
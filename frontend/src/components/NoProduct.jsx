import React from "react";
import { Link } from "react-router-dom";

const NoProduct = () => {

    return(
        <div className="h-[90vh] w-full flex flex-col items-center justify-center">
            <h1 className="mb-2 text-5xl font-bold text-gray-900 text-center">No Product Available</h1>
            <h1 className="text-md mb-6 text-gray-700 text-center">Try searching for another product.</h1>
            
            <Link to={"/"} className="rounded-md text-sm py-2 px-6 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">Home</Link>
        </div>
    )
}

export default NoProduct;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }
    );
    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <h1 className="mb-2 text-5xl font-bold text-gray-900 text-center">Page Not Found</h1>
            <h1 className="text-md mb-6 text-gray-700 text-center">Either something went wrong or the page you were looking for doesn't exist anymore.</h1>
            
            <Link to={"/"} className="rounded-md text-sm py-2 px-6 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">Home</Link>
        </div>
    )
}

export default PageNotFound;
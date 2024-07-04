import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <ImSpinner8 size={50} className="animate-spin text-black" />
        </div>
    )
}

export default Loader;
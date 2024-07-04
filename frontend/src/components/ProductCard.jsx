import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import dummyImage from "../assets/dummyImage.jfif";

const ProductCard = ({ product }) => {
    return(
        <Link to={`/product/${product._id}`} key={product.id} className="rounded-lg shadow-md overflow-hidden bg-white">
            <div className="relative">
                <img className="w-full h-48 object-contain" src={product.images[0].imageUrl} alt={dummyImage} />
                <div className="shadow flex items-center justify-center bg-gray-100 text-sm rounded-full absolute bottom-0 left-0 m-4 px-2">
                    <span>{product.ratingsCount}</span>
                    <FaStar className="text-yellow-500" />
                    <span className="px-1">|</span>
                    <span>{product.reviewsCount}</span>
                </div>
            </div>
            <div className="p-4">
                <h5 className="text-xl font-light tracking-tight text-gray-900 text-nowrap overflow-hidden text-ellipsis">
                {product.name}
                </h5>
                <p className="mt-1 text-md font-bold text-gray-700">Rs {product.discountPrice.toFixed(2)}</p>
            </div>
            <div className="flex products-center justify-between px-4 pb-2">
            </div>
        </Link>
    )
}

export default ProductCard;
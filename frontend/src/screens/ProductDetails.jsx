import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import ProductImagesCarousel from "../components/ProductImagesCarousel";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { BsAward } from "react-icons/bs";
import PageNotFound from "./PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/ProductAction";
import { addToCart } from "../actions/CartAction";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { productId } = useParams();
    // const [product, setProduct] = useState({});

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, product, error } = useSelector(state => state.productDetailsReducer);

    const decreaseQuantity = () => {
        (quantity > 1) ? setQuantity(quantity-1) : setQuantity(quantity)
    }
    const increaseQuantity = () => {
        (quantity < product.stock && quantity < 4) ? setQuantity(quantity+1) : setQuantity(quantity)
    }

    const handleAddToCart = () => {
        dispatch(addToCart(productId, quantity));
        toast.success("Product added to cart.");
        // navigate("/cart");
    }

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId])

    useEffect(() => {
        window.scrollTo(0, 0)
      }
    );


    return(
        <>
            {product && <div className="w-full text-gray-900 sm:px-0 px-3">
                <div className="max-w-[1200px] mx-auto grid sm:grid-cols-5 grid-cols-1 gap-8 py-4">
                    <div className="sm:col-span-3 col-span-1 w-full">
                        <ProductImagesCarousel data={product.images} />
                    </div>
                    <div className="sm:col-span-2 col-span-1 flex flex-col gap-2">
                        <p className="text-2xl font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600 font-bold">{product.metal}</p>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {Array(5).fill(null).map((_, index) => (
                                    <FaStar size={16} key={index} className={index < Math.round(product.ratingsCount) ? "text-yellow-500" : "text-gray-300"} />
                                ))}
                            </div>
                            <p>{product.reviewsCount} reviews</p>
                        </div>

                        {!product.discountPrice ? <div className="flex items-center gap-2">
                            <p className="text-blue-600 text-3xl font-bold">Rs {product.price}</p>
                            <span className="relative">
                                <IoInformationCircleOutline className="text-sm text-gray-500 cursor-pointer" />
                                <span className="bg-gray-300 absolute bottom-4 rounded w-max px-3 left-0 opacity-0">Inclusive of all taxes.</span>
                            </span>
                        </div> :
                        <div className="flex items-center gap-2 p-4 rounded bg-gradient-to-br from-blue-500 to-blue-700">
                            <span className="text-white text-3xl font-semibold">Rs {product.discountPrice}</span> 
                            <span className="text-gray-200 text-sm line-through">Rs {product.price}</span>
                            <span className="relative">
                                <IoInformationCircleOutline className="peer-hover:visible text-sm text-gray-200 cursor-pointer" />
                                <span className="bg-gray-300 absolute bottom-4 rounded w-max px-3 left-0 invisible peer">Inclusive of all taxes.</span>
                            </span>
                        </div> }
                        
                        <p className={product.stock < 1 ? "text-red-700 text-sm font-medium" : "text-green-700 text-sm font-medium"}>{product.stock < 1 ? "Out of stock" : "In stock"}</p>

                        <div className="flex items-center gap-4 text-lg">
                            <GoShieldCheck />
                            <span>1-Year Warranty</span>
                        </div>
                        <div className="flex items-center gap-4 text-lg">
                            <BsAward />
                            <span>Trustmark Certified</span>
                        </div>

                        <p>{product.description}</p>

                        {product.stock > 0 && <div className="flex items-center gap-4">
                            <div className="flex items-center font-thin bg-white border rounded p-2 w-max">
                                <button disabled={quantity <= 1 ? true : false}>
                                    <AiOutlineMinus onClick={decreaseQuantity} size={18} className={quantity <= 1 ? "text-gray-300" : "cursor-pointer"} />
                                </button>
                                <p className="font-semibold mx-6">{quantity}</p>
                                <button disabled={(quantity === product.stock || quantity >= 4) ? true : false}>
                                    <AiOutlinePlus onClick={increaseQuantity} size={18} className={(quantity === product.stock || quantity >= 4) ? "text-gray-300" : "cursor-pointer"} />
                                </button>
                            </div>

                            <div className="w-full my-3">
                                <button onClick={handleAddToCart} className="w-full rounded text-sm py-2 font-semibold bg-cyan-400 hover:bg-cyan-500 text-white duration-150 ease-in-out flex items-center justify-center gap-2">
                                    <IoCartOutline size={20} />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>}

                        {/* <div>
                            <h1 className="font-semibold">Additional Details</h1>
                            <p>Metal: Silver</p>
                            <p>Color: Rose Gold</p>
                            <p></p>
                        </div> */}
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl text-gray-900 font-semibold">Reviews</h2>
                        <Link className="active:bg-gray-100 active:scale-95 rounded text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-100 duration-150 ease-in-out px-4 py-1" to={`/product/${product._id}/review/write`}>Rate Product</Link>
                    </div>
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 my-3">
                        {
                            product.reviews && product.reviews.map((item) => (
                                <div className="flex flex-col gap-2 rounded shadow border p-2 flex-1">
                                    <div>
                                        <div className="">
                                            <p className="font-semibold text-sm leading-6">{item.name}</p>
                                            <div className="flex items-center">
                                                {Array(5).fill(null).map((_, index) => (
                                                    <FaStar size={14} key={index} className={index < item.rating ? "text-yellow-500" : "text-gray-300"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600">{item.comment}</p>
                                        
                                    {/* <p className="absolute bottom-1 right-1 text-sm text-gray-600 text-right">5/4/2024</p> */}
                                </div>
                            ))
                        }
                    </div>
                    {product.reviews && product.reviews.length > 8 ? <div className="my-3 grid place-items-center">
                        <button type="submit" className="rounded text-sm px-4 py-2 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out flex items-center justify-center gap-2">
                            <span>Load More Reviews</span>
                        </button>
                    </div> : ""}
                </div>
            </div>}
        </>
    )
}

export default ProductDetails;
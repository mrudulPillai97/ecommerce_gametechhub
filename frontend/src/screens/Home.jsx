import React, { useEffect, useState } from "react"; 
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getProducts } from "../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import banner from "../assets/homebanner.webp";
import banner1 from "../assets/b1.jpg";
import banner2 from "../assets/b2.jpg";
import mobiles from "../assets/collections/mobiles.webp";
import tablets from "../assets/collections/tablets.webp";
import earbuds from "../assets/collections/earbuds.webp";
import laptops from "../assets/collections/laptops.webp";
import watches from "../assets/collections/watches.webp";
const images = [banner];

const specialBanners = [
    {
        image: banner1,
    },
    {
        image: banner2,
    },
];

const collections = [
    {
        image: mobiles,
        name: "Mobiles",
    },

    {
        image: tablets,
        name: "Tablets",
    },

    {
        image: laptops,
        name: "Laptops",
    },

    {
        image: earbuds,
        name: "Earbuds",
    },

    {
        image: watches,
        name: "Smart Watches",
    },

    
];


const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, []);

    if(loading === true) return <Loader />

    return(
        <>
            <Carousel items={images} />
            <div className="z-20 w-full text-gray-900 sm:px-0 px-4">
                <div className="max-w-[1200px] mx-auto">
                    {/* collections */}
                    <div className="my-8">
                        <h1 className="text-3xl font-light">Collections</h1>
                        <div className="flex items-center sm:justify-between justify-center gap-8 py-8 flex-wrap">
                            {
                                collections.map((item, index) => (
                                    <Link to={`/products/${item.name}`} key={index} className="w-20">
                                        <img src={item.image} alt={item.name} className="rounded-lg shadow-md shadow-gray-300 hover:scale-105 transition-all duration-500" />
                                        <p className="text-center text-sm mt-1">{item.name}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    {/* special banners */}
                    <div className="flex items-center sm:justify-between justify-center gap-8 my-8 sm:flex-nowrap flex-wrap">
                    {
                        specialBanners.map((item, index) => (
                            <div key={index} className="">
                                <img src={item.image} alt={"img"} className="w-full h-full object-cover" />
                            </div>
                        ))
                    }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home;
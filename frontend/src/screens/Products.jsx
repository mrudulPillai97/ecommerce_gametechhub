import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../actions/ProductAction";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import NoProduct from "../components/NoProduct";

const Products = () => {
    const dispatch = useDispatch();
    const { search } = useParams();

    const { loading, products, productsCount, error } = useSelector(state => state.productsReducer);

    const [sort, setSort] = useState("");
    const [collection, setCollection] = useState("");
    const [page, setPage] = useState(1);
    const handleChange = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
        }
        dispatch(getProducts(search, sort, collection, page));
        
    }, [dispatch, error, search, sort, collection, page]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }
    );

    if(loading === true) return <Loader />

    return (
        <>
        {productsCount === 0 && <NoProduct />}
        {productsCount > 0 && <div className="w-full text-gray-900 sm:px-0 px-4">
            <div className="max-w-[1200px] mx-auto py-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="sm:text-xl font-semibold">{`Products Count - ${productsCount}`}</h1>
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="text-sm" htmlFor="sort">Sort By
                            <select className="ml-2 px-2 py-1 border rounded-md outline-none focus:border-slate-800" name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="">None</option>
                                <option value="new">What's New</option>
                                <option value="betterDiscount">Better Discount</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="betterRating">Customer Rating</option>
                            </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    {
                        products && products.map(product => (
                            <ProductCard product={product} />
                        ))
                    }
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    {
                        productsCount > 20 && <button onClick={() => setPage(page + 1)} className="px-4 py-2 text-white bg-slate-800 rounded-md outline-none focus:outline-none hover:bg-slate-900">Load More</button>
                    }
                </div>
            </div>
        </div>}
        </>
    )
}

export default Products;
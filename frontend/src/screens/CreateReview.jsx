import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { FaStar } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, createReview } from "../actions/ProductAction";
import toast from "react-hot-toast";
import { CREATE_REVIEW_RESET } from "../constants/ProductConstant";
import MetaData from "../components/MetaData";

const CreateReview = () => {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { loading, success, message, error } = useSelector(state => state.reviewCreateUpdateReducer);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);

        dispatch(createReview(formData));
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success === true) {
            toast.success(message);
            dispatch({type: CREATE_REVIEW_RESET})
            window.history.back();
        }
    }, [dispatch, error, message, success]);

    return (
        <>
        <MetaData title="Write Review" />
        <div className="w-full text-gray-900">
            <div className="max-w-[1200px] mx-auto grid sm:grid-cols-3 grid-cols-1 gap-4 py-4">
                <div className="col-span-1 bg-gray-50 shadow p-4">
                    <label className="text-xl font-semibold mb-2">What makes a good review</label>
                    <div className="flex flex-col gap-4 my-3">
                        <div className="border-b-2 pb-2">
                            <label className="font-semibold">Have you used this product?</label>
                            <p className="text-sm">Your review should be about your experience with the product.</p>
                        </div>
                        <div className="border-b-2 pb-2">
                            <label className="font-semibold">Why review a product?</label>
                            <p className="text-sm">Your valuable feedback will help fellow shoppers decide!</p>
                        </div>
                        <div className="border-b-2 pb-2">
                            <label className="font-semibold">How to review a product?</label>
                            <p className="text-sm">Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 bg-gray-50 shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Create Review</h2>
                    <form action="">
                        <div className="w-full my-3">
                            <label className="text-sm font-semibold" htmlFor="rating">Rating</label>
                            <div className="flex items-center gap-1 mt-2">
                                {
                                    [1,2,3,4,5].map((value) => {
                                        return (
                                            <div onClick={() => setRating(value)} key={value} className={`cursor-pointer text-xl ${rating >= value ? "text-yellow-500" : "text-gray-300"}`}>
                                                <FaStar size={18} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* <div className="w-full my-3">
                            <label className="text-sm font-semibold" htmlFor="title">Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="title" type="text" placeholder="Enter title" />
                            </div>
                            
                            <div className="w-full my-3">
                            <label className="text-sm font-semibold" htmlFor="description">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block resize-none" id="description" type="text" placeholder="Enter description" />
                        </div> */}
                        <div className="w-full my-3">
                            <label className="text-sm font-semibold" htmlFor="comment">Comment</label>
                            <textarea rows={5} value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block resize-none" id="comment" type="text" placeholder="Enter comment" />
                        </div>

                        <div onClick={handleSubmit} className="w-full my-3">
                            <button disabled={loading ? true : false} type="submit" className="w-full rounded-md text-sm py-2 font-semibold bg-teal-400 text-white hover:bg-teal-500 duration-150 ease-in-out">{
                                loading ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Submit Review"
                            }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateReview;
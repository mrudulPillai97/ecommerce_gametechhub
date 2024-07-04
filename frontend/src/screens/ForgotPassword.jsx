import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { clearErrors, forgotPassword } from '../actions/UserAction';
import MetaData from "../components/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const { loading, error, message } = useSelector(state => state.forgotPasswordReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if(message) {
            toast.success(message);
        }
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, message]);

    return (
        <>
        <MetaData title="Forgot Password" />
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
            <p className="text-center text-sm">Kindly enter the email address tied to your account, we would help you reset your password.</p>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="email" type="email" placeholder="Enter email" />
                </div>

                <div className="w-full my-3">
                    <button disabled={loading === true ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded-md text-sm py-2 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">{
                        loading === true ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Send Reset Link"
                    }</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ForgotPassword;
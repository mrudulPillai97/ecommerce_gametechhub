import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../actions/UserAction";
import toast from "react-hot-toast";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, isAuthenticated, success } = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(login(email, password));

        if(success && success === true) toast.success("User logged in successfully.");
    }

    const redirect = window.location.search ? "/shipping" : "/account/profile";

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated === true) {
            navigate(redirect);
        }
    }, [dispatch, error, isAuthenticated, navigate, redirect]);

    return (
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Login to Your Account</h1>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="email" type="email" placeholder="Enter email" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="w-full my-2">
                    <Link to={"/password/forgot"} className="text-gray-600 font-medium text-sm text-right cursor-pointer">Forgot Password?</Link>
                </div>
                <div className="w-full my-3">
                    <button disabled={loading === true ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded-md text-sm py-2 font-semibold bg-cyan-400 text-black hover:bg-cyan-500 duration-150 ease-in-out">{
                        loading === true ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Login"
                    }</button>
                </div>
            </form>
            <p className="text-gray-600 font-medium text-sm text-center">OR</p>
            <div className="w-full my-2 text-center">
                <p className="text-sm text-gray-600 font-medium">Not a member yet? <Link to={"/register"} className="text-cyan-500 cursor-pointer">Create an account</Link></p>
            </div>
        </div>
    )
}

export default Login;
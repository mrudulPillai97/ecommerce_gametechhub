import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../actions/UserAction";
import { toast } from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, error, success } = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phoneNumber", phoneNumber);
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        dispatch(register(formData));
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success) {
            toast.success("User registered successfully.");
            navigate("/login");
        }
    }, [error, dispatch, navigate, success]);

    return (
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form encType="multipart/form-data" onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Create Your Account</h1>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="fullName">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="fullName" type="text" placeholder="Enter full name" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="email" type="email" placeholder="Enter email" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="phoneNumber">Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="no-spinner mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="phoneNumber" maxLength={10} minLength={10} type="number" placeholder="Enter phone number" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="confirmPassword" type="password" placeholder="Enter confirm password" />
                </div>

                <div className="w-full my-3">
                    <button disabled={loading ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded-md text-sm py-2 font-semibold bg-teal-400 text-black hover:bg-teal-500 duration-150 ease-in-out">{
                        loading ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Register"
                    }</button>
                </div>
            </form>
            <p className="text-gray-600 font-medium text-sm text-center">OR</p>
            <div className="w-full my-2 text-center">
                <p className="text-sm text-gray-600 font-medium">Already a member? <Link to={"/login"} className="text-teal-400">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;
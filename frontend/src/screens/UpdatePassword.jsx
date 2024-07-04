import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../actions/UserAction';
import { UPDATE_PASSWORD_RESET } from '../constants/UserConstant';
import MetaData from "../components/MetaData";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { loading, success, message, error  } = useSelector(state => state.profileReducer);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success === true) {
            toast.success(message);
            navigate("/account/profile");
            dispatch({ type: UPDATE_PASSWORD_RESET });
            window.location.reload();
        }
    }, [error, success, message, navigate, dispatch]);

    return (
        <>
        <MetaData title="Update Password" />
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Update Password</h1>
                <p className="text-center text-sm">Kindly enter the old and new passwords to update your password.</p>

                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="oldPassword">Old Password</label>
                    <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="oldPassword" type="password" placeholder="Enter old password" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="password">New Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="password" type="password" placeholder="Enter new password" />
                </div>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="confirmPassword">Confirm New Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="confirmPassword" type="password" placeholder="Enter confirm new password" />
                </div>

                <div className="w-full my-3">
                    <button disabled={loading === true ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded shadow text-sm py-2 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">{
                        loading === true ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Update Password"
                    }</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdatePassword;
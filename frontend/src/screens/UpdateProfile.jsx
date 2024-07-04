import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile } from '../actions/UserAction';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UPDATE_PROFILE_RESET } from '../constants/UserConstant';
import MetaData from "../components/MetaData";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector(state => state.userReducer);
    const { loading, success, message, error  } = useSelector(state => state.profileReducer);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phoneNumber", phoneNumber);

        dispatch(updateProfile(formData));
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success === true) {
            toast.success(message);
            navigate("/account/profile");
            dispatch({ type: UPDATE_PROFILE_RESET });
            window.location.reload();
        }
    }, [error, success, message, navigate, dispatch]);

    return (
        <>
        <MetaData title="Update Profile" />
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Update Profile</h1>
                <p className="text-center text-sm">Kindly enter the following details to update your profile.</p>

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
                {/* <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="age">Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} className="no-spinner mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="age" maxLength={3} minLength={1} type="number" placeholder="Enter age" />
                </div> */}

                {/* <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="gender">Gender</label>
                    <div className="flex items-center w-full">
                        <div className="mr-4">
                        <input checked value={"Male"} className="mt-2 text-sm font-medium p-2 text-gray-900" name="gender" id="male" type="radio" />
                        <label className="ml-2 text-sm" htmlFor="male">Male</label>
                        </div>
                        <div className="ml-4">
                        <input value={"Female"} className="mt-2 text-sm font-medium p-2 text-gray-900" name="gender" id="female" type="radio" />
                        <label className="ml-2 text-sm" htmlFor="female">Female</label>
                        </div>
                        </div>
                    </div> */}

                <div className="w-full my-3">
                    <button disabled={loading === true ? true : false} onClick={handleSubmit} type="submit" className="w-full rounded shadow text-sm py-2 font-semibold bg-cyan-400 text-white hover:bg-cyan-500 duration-150 ease-in-out">{
                        loading === true ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Update Profile"
                    }</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdateProfile;
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import person from "../assets/profile/person.png";
import { MdLogout, MdOutlineUpdate } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { clearErrors, loadUser, logout } from "../actions/UserAction";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import MetaData from "../components/MetaData";

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, user, isAuthenticated } = useSelector(state => state.userReducer);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            clearErrors();
        }
        if(isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated, error, user])

    useEffect(() => {
        window.scrollTo(0, 0)
      }
    );

    if(loading === true) return <Loader />

    return (
    <>
        <MetaData title="My Account" />
        {user && <div className="w-full text-gray-900 sm:px-0 px-4">
        <div className="max-w-[1200px] mx-auto sm:grid sm:grid-cols-4 block gap-8 py-4">
            <div className="col-span-1">
                <img className="w-full p-6 object-contain rounded-full bg-white" src={person} alt="img" />
                <Link to={"/account/profile/update"} className="flex items-center justify-center rounded shadow text-sm py-2 my-2 font-semibold bg-gray-50 hover:bg-gray-100 duration-150 ease-in-out">Update Profile</Link>
                <Link to={"/account/password/update"} className="flex items-center justify-center rounded shadow text-sm py-2 my-2 font-semibold bg-teal-400 text-white hover:bg-teal-500 duration-150 ease-in-out">Update Password</Link>
            </div>
            <div className="col-span-2">
                <div className="flex items-center">
                    <h2 className="text-2xl font-semibold">Personal Information</h2>
                </div>
                <form>
                
                    <div className="w-full my-3">
                        <label className="text-sm font-semibold" htmlFor="fullName">Full Name</label>
                        <input readOnly value={user?.name} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 rounded block" id="fullName" type="text" />
                    </div>
                    <div className="w-full my-3">
                        <label className="text-sm font-semibold" htmlFor="email">Email</label>
                        <input readOnly value={user?.email} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 rounded block" id="email" type="email" />
                    </div>
                    <div className="w-full my-3">
                        <label className="text-sm font-semibold" htmlFor="phoneNumber">Phone Number</label>
                        <input readOnly value={user?.phoneNumber} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 rounded block" id="phoneNumber" type="number" />
                    </div>
                
                </form>
            </div>
            <div className="col-span-1">
                <div className="bg-gray-50 shadow rounded text-sm font-semibold">
                    {user.role === "Admin" && <div onClick={() => navigate("/account/admin/dashboard")} className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-100">
                        <RxDashboard size={16} />
                        <p className="pl-4">Dashboard</p>
                    </div>}
                    <div onClick={() => navigate("/account/orders")} className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-100">
                        <IoIosList size={16} />
                        <p className="pl-4">My Orders</p>
                    </div>

                    <div onClick={handleLogout} className="flex items-center px-4 py-4 text-red-700 cursor-pointer hover:bg-gray-100">
                        <MdLogout size={16} className="text-red-700" />
                        <p className="pl-4">Logout</p>
                    </div>
                </div>
            </div>
            
        </div>
        </div>}
    </>
    )
}

export default Account;
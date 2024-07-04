import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../actions/CartAction";
import toast from "react-hot-toast";
import MetaData from "../components/MetaData.js";

const states = [
    {
    "key": "AN",
    "name": "Andaman and Nicobar Islands"
    },
    {
    "key": "AP",
    "name": "Andhra Pradesh"
    },
    {
    "key": "AR",
    "name": "Arunachal Pradesh"
    },
    {
    "key": "AS",
    "name": "Assam"
    },
    {
    "key": "BR",
    "name": "Bihar"
    },
    {
    "key": "CG",
    "name": "Chandigarh"
    },
    {
    "key": "CH",
    "name": "Chhattisgarh"
    },
    {
    "key": "DH",
    "name": "Dadra and Nagar Haveli"
    },
    {
    "key": "DD",
    "name": "Daman and Diu"
    },
    {
    "key": "DL",
    "name": "Delhi"
    },
    {
    "key": "GA",
    "name": "Goa"
    },
    {
    "key": "GJ",
    "name": "Gujarat"
    },
    {
    "key": "HR",
    "name": "Haryana"
    },
    {
    "key": "HP",
    "name": "Himachal Pradesh"
    },
    {
    "key": "JK",
    "name": "Jammu and Kashmir"
    },
    {
    "key": "JH",
    "name": "Jharkhand"
    },
    {
    "key": "KA",
    "name": "Karnataka"
    },
    {
    "key": "KL",
    "name": "Kerala"
    },
    {
    "key": "LD",
    "name": "Lakshadweep"
    },
    {
    "key": "MP",
    "name": "Madhya Pradesh"
    },
    {
    "key": "MH",
    "name": "Maharashtra"
    },
    {
    "key": "MN",
    "name": "Manipur"
    },
    {
    "key": "ML",
    "name": "Meghalaya"
    },
    {
    "key": "MZ",
    "name": "Mizoram"
    },
    {
    "key": "NL",
    "name": "Nagaland"
    },
    {
    "key": "OR",
    "name": "Odisha"
    },
    {
    "key": "PY",
    "name": "Puducherry"
    },
    {
    "key": "PB",
    "name": "Punjab"
    },
    {
    "key": "RJ",
    "name": "Rajasthan"
    },
    {
    "key": "SK",
    "name": "Sikkim"
    },
    {
    "key": "TN",
    "name": "Tamil Nadu"
    },
    {
    "key": "TS",
    "name": "Telangana"
    },
    {
    "key": "TR",
    "name": "Tripura"
    },
    {
    "key": "UK",
    "name": "Uttar Pradesh"
    },
    {
    "key": "UP",
    "name": "Uttarakhand"
    },
    {
    "key": "WB",
    "name": "West Bengal"
    }
];

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("India");
    const [landmark, setLandmark] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!address || !city || !state || !pincode || !country || !landmark || !phoneNumber) {
            toast.error("Please fill all the details.");
            return;
        }
        if(pincode.length !== 6) {
            toast.error("Please enter valid 6 digits Pincode.");
            return;
        }
        if(phoneNumber.length !== 10) {
            toast.error("Please enter valid 10 digits Phone Number.");
            return;
        }
        dispatch(saveShippingInfo({
            address, city, state, country, pincode, landmark, phoneNumber
        }));
        navigate("/order/confirm");
    }

    return(
        <>
        <MetaData title="Shipping Details" />
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="md:w-1/4 sm:w-1/2 w-full md:px-0 px-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Shipping Details</h1>
            <p className="text-center text-sm">Kindly enter the address correctly, so that we could deliver your products to you.</p>
                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="address">Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="address" type="text" placeholder="Enter address" />
                </div>

                <div className="flex justify-between w-full gap-4 my-3">
                    <div className="w-1/2">
                        <label className="text-sm font-semibold" htmlFor="city">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="city" type="text" placeholder="Enter your city" />
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-semibold" htmlFor="pincode">Pincode</label>
                        <input value={pincode} onChange={(e) => setPincode(e.target.value)} className="no-spinner mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="pincode" type="number" placeholder="Enter your pincode" />
                    </div>
                </div>

                <div className="flex justify-between w-full gap-4 my-3">
                    <div className="w-1/2">
                        <label className="text-sm font-semibold" htmlFor="state">State</label>
                        <select required value={state} onChange={(e) => setState(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="state">
                            <option value="">Select state</option>
                            {
                                states.map((item) => (
                                    <option key={item.key}>{item.name}</option>
                                ))
                            }  
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-semibold" htmlFor="country">Country</label>
                        <input readOnly value={country} onChange={(e) => setCountry(e.target.value)} className="no-spinner mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 rounded block" id="country" type="text" placeholder="Enter country" />
                    </div>
                </div>

                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="landmark">Landmark</label>
                    <input value={landmark} onChange={(e) => setLandmark(e.target.value)} className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="landmark" type="text" placeholder="Enter landmark" />
                </div>

                <div className="w-full my-3">
                    <label className="text-sm font-semibold" htmlFor="phoneNumber">Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="no-spinner mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block" id="phoneNumber" type="number" placeholder="Enter phone number" />
                </div>

                <div onClick={handleSubmit} className="w-full my-3">
                    <button type="submit" className="w-full rounded text-sm py-2 font-semibold bg-teal-400 text-white hover:bg-teal-500 duration-150 ease-in-out">{
                        loading ? <ImSpinner8 className="animate-spin mx-auto text-xl" /> : "Proceed"
                    }</button>
                </div>
            </form>
        </div>
    </>
    )

}

export default Shipping;
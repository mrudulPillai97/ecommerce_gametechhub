import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline, IoCartOutline, IoSearchOutline } from "react-icons/io5";
import logo  from "../assets/eshopifyLogo.png";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.userReducer);

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if(search.trim()) {
            navigate(`/products/${search}`);
        }
        else {
            navigate(`/products`);
        }
    }

    return(
        <div className="z-20 w-full bg-teal-300 text-gray-900 sticky top-0 left-0 shadow">
            <div className="sm:h-[10vh] h-[8vh] max-w-[1200px] m-auto flex items-center justify-between md:px-0 px-2">
                <Link to={"/"} className="h-2/3"><img className="h-full object-cover" src={logo} alt="Brand Logo" /></Link>
                <form onSubmit={handleSearch} className="md:flex flex-grow items-center justify-center hidden relative mx-12">
                    <input autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 block w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded" id="search" type="text" placeholder="Search for products" />
                    <IoSearchOutline onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" size={20} />
                </form>
                <div className="flex items-center justify-center">
                    {!user && <Link to={"/login"} className="mx-4 cursor-pointer border border-black rounded shadow text-black px-4 py-1 bg-white hover:bg-teal-500 transition duration-300">Login</Link>}
                    {user && <Link to={"/account/profile"} className="mx-4 cursor-pointer hover:scale-110"><IoPersonOutline size={26} /></Link>}
                    <Link to={"/cart"} className="mx-4 cursor-pointer hover:scale-110"><IoCartOutline size={26} /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
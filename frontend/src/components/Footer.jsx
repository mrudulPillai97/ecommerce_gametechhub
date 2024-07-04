import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const [keyword, setKeyword] = useState("");

    return(
        <div className="z-20 w-full bg-teal-300 text-black">
            <div className="max-w-[1200px] sm:mx-auto py-8 px-2">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <h2 className="text-xl font-semibold pb-2">Quick Links</h2>
                        <ul>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">Customer Reviews</Link></li>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">Our Blogs</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-xl font-semibold pb-2">Info</h2>
                        <ul>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">Shipping & Returns</Link></li>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">Privacy Policy</Link></li>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">FAQs & Support</Link></li>
                            <li className="leading-7"><Link className="cursor-pointer hover:underline underline-offset-4">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-xl font-semibold pb-2">Contact Us</h2>
                        <ul>
                            <li className="leading-7">E-Shopify</li>
                            <li className="leading-7">First Floor, Raghunath Complex, Mumbai 421305</li>
                            <li className="leading-7"> - eshopify@gmail.com</li>
                            <li className="leading-7"> - 9896585254(10:30 AM to 8:30 PM)</li>
                        </ul>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-4">
                    <div className="col-span-1">
                        <p className="text-sm text-black mt-4">Copyright &copy; 2024 E-Shopify</p>
                    </div>
                    <div className="flex items-center md:justify-end col-span-1 gap-4">
                        <Link className="cursor-pointer hover:scale-110"><FaFacebook size={26} /></Link>
                        <Link className="cursor-pointer hover:scale-110"><FaInstagram size={26} /></Link>
                        <Link className="cursor-pointer hover:scale-110"><FaYoutube size={26} /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
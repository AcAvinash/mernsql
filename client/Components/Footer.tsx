import React from 'react';
import { FaTruck, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#103178] shadow-lg w-full mt-8 md:mb-0 mb-14 dark:bg-[#103178]">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold text-white mb-2">24X7 Home Delivery</h3>
                        <FaTruck className="text-4xl text-white" />
                    </div>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li className="me-4 md:me-6">
                            <a href="#" className="hover:underline text-white">About</a>
                        </li>
                        <li className="me-4 md:me-6">
                            <a href="#" className="hover:underline text-white">Privacy Policy</a>
                        </li>
                        <li className="me-4 md:me-6">
                            <a href="#" className="hover:underline text-white">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-white">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center mt-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <FaFacebook className="text-2xl text-white" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <FaTwitter className="text-2xl text-white" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <FaInstagram className="text-2xl text-white" />
                    </a>
                    <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <FaWhatsapp className="text-2xl text-white" />
                    </a>
                </div>
                <div className="w-full text-center mt-4">
                    <span className="text-sm text-white sm:text-center dark:text-white">
                        © 2024 <a href="/" className="hover:underline">Labhkari™</a>. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

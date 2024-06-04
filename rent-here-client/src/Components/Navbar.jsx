import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Start a Search" },
        { path: "/my-houses", title: "My Houses" },
        { path: "/rent-estimate", title: "Rent Estimate" },
        { path: "/post-house", title: "Post a House" }
    ];

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex items-center justify-between py-6'>
                <a href="/" className='flex items-center gap-2 text-2xl'>
                    <img src={logo} alt="logo" width={40} />
                    <span className='font-semibold'>Rent <span className='text-blue'>Here</span></span>
                </a>
                {/* nav items for large devices */}
                <ul className='hidden md:flex gap-12'>
                    {
                        navItems.map(({ path, title }) => (
                            <li key={path} className='text-base text-primary'>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                {/* mobile menu */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />}
                    </button>
                </div>
            </nav>
            {/* navItems for mobileScreens */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : "closed"} px-4 py-5 rounded-sm`}>
                <ul>
                    {
                        navItems.map(({ path, title }) => (
                            <li key={path} className='text-base text-black py-1'>
                                <NavLink
                                    onClick={handleMenuToggler}
                                    to={path}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </header>
    );
};

export default Navbar;

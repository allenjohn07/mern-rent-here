import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState("")
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        setEmail(window.localStorage.getItem("email"))
    }, [])


    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Start a Search" },
        { path: "/my-houses", title: "My Houses" },
        { path: "/rent-estimate", title: "Rent Estimate" },
        { path: "/post-house", title: "Post a House" },
    ];

    const handleLogout = () => {
        handleMenuToggler();
        Toast.fire({
            icon: "success",
            title: "Logged out"
        });
        setTimeout(() => {
            window.localStorage.clear();
            window.location.replace("/");
        }, 2000);
    };

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex items-center justify-between py-6'>
                <Link to={"/"}>
                    <div className='flex items-center gap-2 text-2xl'>
                        <img src={logo} alt="logo" width={40} />
                        <span className='font-semibold'>Rent <span className='text-blue'>Here</span></span>
                    </div>
                </Link>
                {/* nav items for large devices */}
                <ul className='hidden md:flex gap-12 items-center'>
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
                    {
                        email ? <button onClick={handleLogout} className='bg-blue text-white py-2 px-5 rounded font-semibold'>Logout</button> : <Link to={"/auth/login"}>
                            <button className='bg-blue text-white py-2 px-5 rounded font-semibold'>
                                Login
                            </button>
                        </Link>
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
                    {
                        email ? <button onClick={handleLogout} className='bg-blue text-white py-1 px-2 rounded font-semibold mt-2'>Logout</button> : <Link to={"/auth/login"}>
                            <button onClick={handleMenuToggler} className='bg-blue text-white py-1 px-2 rounded font-semibold mt-2'>
                                Login
                            </button>
                        </Link>
                    }

                </ul>
            </div>
        </header>
    );
};

export default Navbar;

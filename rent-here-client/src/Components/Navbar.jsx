import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';
import UserDropdown from './UserDropdown';
import { Spinner } from '@nextui-org/react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState("")
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
    const navigate = useNavigate()

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user")))
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
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
        window.localStorage.removeItem('user')
        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    };

    const handleLoginNavigate = () => {
        navigate("/auth/login")
        window.localStorage.removeItem('user')
    }

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4 shadow-sm'>
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
                            <li key={path} className='text-base text-primary hover:scale-105 transition-all'>
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
                        isLoading ? <Spinner size="sm" className='h-8 w-8' /> :
                            user ? <UserDropdown menuToggler={handleMenuToggler} handleLogout={handleLogout} name={user.name} email={user.email} /> :
                                <button onClick={handleLoginNavigate} className='bg-blue text-white py-2 px-5 rounded font-semibold'>
                                    Login
                                </button>
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
                        isLoading ? <Spinner size="sm" className='h-8 w-8' /> :
                            user ? <UserDropdown menuToggler={handleMenuToggler} handleLogout={handleLogout} name={user.name} email={user.email} /> :
                                <Link to={"/auth/login"}>
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

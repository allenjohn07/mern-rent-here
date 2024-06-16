import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from "flowbite-react";
import Swal from 'sweetalert2'
import { instance } from '../config/axios.js'
import { Link } from 'react-router-dom';


const Login = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    //funtion to login
    const handleLogin = async () => {
        try {
            const loginResponse = await instance.post('/auth/login', login)
            const data = loginResponse.data
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
            if (data.message === 'Login Successfull') {
                Toast.fire({
                    icon: "success",
                    title: `${data.message}`
                });
                setTimeout(() => {
                    window.localStorage.setItem("name", data.name)
                    window.localStorage.setItem("email", data.email)
                    setLogin({
                        email: '',
                        password: ''
                    })
                    window.location.replace('/')
                }, 2000)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: `${data.message}`
                })
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='min-h-screen flex flex-col items-center lg:justify-center justify-start m-5'>
            <div className='lg:w-1/3 w-full text-center'>
                <div className='border flex flex-col gap-5 items-center justify-center rounded-3xl py-10 mb-5'>
                    <h1 className='text-2xl font-bold'>Welcome Back!</h1>
                    <Input
                        isClearable
                        type="email"
                        label="Email"
                        value={login.email}
                        variant="bordered"
                        placeholder="Enter your email"
                        onClear={() => setLogin({ ...login, email: '' })}
                        className="w-2/3"
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                    <Input
                        label="Password"
                        variant="bordered"
                        value={login.password}
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaEyeSlash className="text-lg" />
                                ) : (
                                    <FaEye className="text-lg" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="w-2/3"
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    />
                    <Button onClick={handleLogin} gradientDuoTone="purpleToBlue">Login</Button>
                </div>
                <div className='flex items-center justify-center'>Don't have an account? &nbsp;<Link to={"/auth/register"}><p className='underline font-semibold'>Sign Up</p> </Link></div>
            </div>
        </div>
    )
}

export default Login
import React, { useEffect, useState } from 'react'
import { Input, user } from "@nextui-org/react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from "flowbite-react";
import Swal from 'sweetalert2'
import { instance } from '../config/axios.js'
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        const userFromCookies = window.localStorage.getItem('user')
        if (userFromCookies) {
            window.localStorage.removeItem('user')
        }
    }, [])

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
                window.localStorage.setItem('user',JSON.stringify({name:data.name, email: data.email}))
                Toast.fire({
                    icon: "success",
                    title: `${data.message}`
                });
                setTimeout(() => {
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


    const GoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);

            const response = await instance.post("/auth/google/login", {
                name: userInfo.name,
                email: userInfo.email,
                imageURL: userInfo.picture
            })
            console.log(response.data.message);
            const data = response.data
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
            if (data.message === 'User exist!' || data.message === 'Registered Successfully!') {
                window.localStorage.setItem('user', JSON.stringify({ name: userInfo.name, email: userInfo.email }))
                Toast.fire({
                    icon: "success",
                    title: "Login Successfull"
                });
                setTimeout(() => {
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

        },
    });


    return (
        <div className='min-h-screen flex flex-col items-center lg:justify-center justify-start m-5'>
            <div className='lg:w-1/3 w-full text-center mb-20'>
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
                    <button onClick={() => GoogleLogin()} outline className="border py-2 px-4 rounded-md border-gray-500 hover:scale-105 transition-all hover: border-b-gray-950 hover:border-b-large">
                        <div className="flex items-center gap-2">
                            <FaGoogle />
                            Sign In with Google
                        </div>
                    </button>
                    <div className='flex items-center justify-center'>Don't have an account? &nbsp;<Link to={"/auth/register"}><p className='underline font-semibold'>Sign Up</p> </Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login
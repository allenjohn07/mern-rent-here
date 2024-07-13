import React, { useEffect, useRef, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Cookies from 'universal-cookie'
import { Spinner } from '@nextui-org/react';
import { instance } from '../config/axios.js'

const EmailVerification = () => {
    const [token, setTokens] = useState();
    const [user, setUser] = useState()
    const [isloading, setIsLoading] = useState(true)

    const cookies = new Cookies()
    const navigate = useNavigate()

    const customInput = ({ events, props }) => {
        return <><input {...events} {...props} type="text" className="custom-otp-input-sample" />
            {props.id === 2 && <div className="px-3">
                <i className="pi pi-minus" />
            </div>}
        </>
    };

    useEffect(() => {
        const userfromcookie = cookies.get('user')
        if (userfromcookie) {
            setUser(userfromcookie)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])


    const handleResend = async () => {
        setIsLoading(true)
        try {
            const response = await instance.post("/verification/email/send", { name: user.name, email: user.email })
            if (response.data.message === 'Email sent successfully') {
                setIsLoading(false)
                return alert(`${response.data.message}`)
            }
            alert(`${response.data.message}`)
            setIsLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!token || token.length !== 6) {
            alert("Invalid OTP")
            return console.log("invalid otp");
        }
        // console.log(token);
        setIsLoading(true)
        try {
            const response = await instance.post("/verification/email/verify",{email: user.email, token})
            if (response.data.message === "Verfied Successfully") {
                setTokens("")
                navigate("/")
                setIsLoading(false)
                return alert(`${response.data.message}`)
            }
            setIsLoading(false)
            return alert(`${response.data.message}`)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const handleGoBack = () => {
        navigate("/")
    }

    return (
        <div className="flex items-start lg:items-center mt-20 lg:mt-0 justify-center h-screen">
            <style scoped>
                {`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }
                `}
            </style>
            {
                isloading ?
                    <div className="flex items-center space-x-2">
                        <Spinner size='sm' />
                        <span className='font-semibold text-gray-700'>Please wait...</span>
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-xl mb-2">Verify your Email</p>
                        <p className="text-color-secondary block mb-5">Please enter the code sent to your email.</p>
                        <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                        <div className="flex justify-between mt-5 self-stretch">
                            <Button onClick={handleResend} gradientDuoTone="tealToLime">Resend Code</Button>
                            <Button onClick={handleSubmit} gradientDuoTone="tealToLime">Submit Code</Button>
                        </div>
                    </div>
            }
            <div className='absolute bottom-10 right-10'>
                <Button onClick={handleGoBack} gradientDuoTone="tealToLime">Go back</Button>
            </div>
        </div>
    )
}

export default EmailVerification
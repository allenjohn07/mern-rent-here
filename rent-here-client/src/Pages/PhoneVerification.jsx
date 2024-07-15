import React, { useEffect, useRef, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Spinner } from '@nextui-org/react';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { instance } from '../config/axios';

const PhoneVerification = () => {
    const [token, setTokens] = useState();
    const [user, setUser] = useState()
    const [isloading, setIsLoading] = useState(true)
    const [phone, setPhone] = useState()

    const navigate = useNavigate()
    const toast = useRef(null);

    const customInput = ({ events, props }) => {
        return <><input {...events} {...props} type="text" className="custom-otp-input-sample" />
            {props.id === 2 && <div className="px-3">
                <i className="pi pi-minus" />
            </div>}
        </>
    };

    useEffect(() => {
        const userfromcookie = window.localStorage.getItem('user')
        if (userfromcookie) {
            setUser(JSON.parse(userfromcookie))
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleSendOTP = async () => {
        if (!phone || phone.length !== 13) {
            toast.current.show({ severity: 'error', detail: 'Invalid Phone Number', life: 3000 });
            return
        }
        console.log(phone);
        try {
            const response = await instance.post("/verification/phone/send", { phone, email: user.email })
            if (response.data.message === "SMS sent successfully") {
                toast.current.show({ severity: 'success', detail: `${response.data.message}`, life: 3000 });
                setPhone("")
                return
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', detail: error, life: 3000 });
        }
    }


    const handleResend = async () => {
        handleSendOTP()
    }

    const handleSubmit = async () => {

        if (!token || token.length !== 6) {
            alert("Invalid OTP")
            return console.log("invalid otp");
        }
        console.log(token);
        try {
            const response = await instance.post("/verification/phone/verify", { email: user.email, token })
            if (response.data.message === "Verfied Successfully"){
                setTokens("")
                toast.current.show({ severity: 'success', detail: `${response.data.message}`, life: 3000 });
                navigate("/")
                return
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', detail: error, life: 3000 });
        }
    }

    const handleGoBack = () => {
        navigate("/")
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-0">
            <Toast ref={toast} position="bottom-right" />
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
                    <div className='flex flex-col items-center mt-20 lg:mt-0 justify-start lg:justify-center h-screen gap-20'>
                        <div className='flex flex-col lg:flex-row items-center gap-5'>
                            <p className="font-bold text-xl mb-2 text-center">Enter your Phone Number</p>
                            <InputText defaultValue={"+91"} onChange={(e) => setPhone(e.target.value)} className='border px-2 h-10 w-52' keyfilter="int" placeholder="Phone" />
                            <Button onClick={handleSendOTP} className='rounded-xl' gradientDuoTone="purpleToBlue">Send OTP</Button>
                        </div>
                        <div className="flex flex-col items-center mt-10 lg:mt-0">
                            <p className="font-bold text-xl mb-2 text-center">Verify your Phone</p>
                            <p className="text-color-secondary block mb-5 text-center">Please enter the code sent to your phone.</p>
                            <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                            <div className="flex justify-between mt-5 self-stretch">
                                <Button onClick={handleResend} gradientDuoTone="redToYellow">Resend Code</Button>
                                <Button onClick={handleSubmit} gradientDuoTone="redToYellow">Submit Code</Button>
                            </div>
                        </div>
                    </div>
            }
            <div className='absolute bottom-[-100px] right-5 lg:bottom-10 lg:right-10 '>
                <Button onClick={handleGoBack} gradientDuoTone="redToYellow">Go back</Button>
            </div>
        </div>


    )
}

export default PhoneVerification

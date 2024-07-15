import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Spinner } from "@nextui-org/react";
import { Badge } from "flowbite-react";
import { instance } from '../config/axios';
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import { FaTelegramPlane } from "react-icons/fa";
import userLogo from '../assets/userLogo.png'


const UserDropdown = ({ handleLogout, name, email }) => {

    const [user, setUser] = useState()
    const toast = useRef(null);

    useEffect(() => {
        if (email) {
            currentUser(email);
        } else {
            console.log('Email is undefined');
        }
    }, [user]);

    const currentUser = async (email) => {
        try {
            const response = await instance.post('/auth/user', { email });
            setUser(response.data.user)
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate()

    const handleEmailSend = () => {
        toast.current.show({ severity: 'contrast', detail: <div className='flex items-center gap-2'> <FaTelegramPlane/> <span>Sending Email</span></div>, life: 3000 });
        setTimeout(async () => {
            try {
                const response = await instance.post("/verification/email/send", { name, email })
                if (response.data.message === 'Email sent successfully') {
                    toast.current.show({ severity: 'success', detail: `${response.data.message}`, life: 3000 });
                    navigate("/verification/email")
                    return 
                } else {
                    toast.current.show({ severity: 'success', detail: `${response.data.message}`, life: 3000 });
                }
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', life: 3000 });
            }
        }, 2000);
    }


    const handlePhoneSend = () => {
        if(user?.isPhoneVerified){
            toast.current.show({ severity: 'success', detail: "Phone already verified", life: 3000 });
            return 
        }
        navigate("/verification/phone")
    }



    return (
        <>
            <Toast ref={toast} position="bottom-right" />
            <Dropdown>
                <DropdownTrigger>
                    <Avatar className='mt-2 lg:mt-0 h-8 w-8 cursor-pointer hover:scale-105 transition-all' showFallback src={user?.imageURL ? `${user.imageURL}` : `${userLogo}`} />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem textValue='user' color='none' key="user">
                        <div className='flex flex-col cursor-default'>
                            {name}
                            <span className='text-xs'>{email}</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem textValue='verifyEmail' key="copy">
                        <div onClick={handleEmailSend} className='flex justify-between'>
                            Verify Email
                            <Badge color={user?.isEmailVerified ? "success" : "failure"}>
                                {
                                    user?.isEmailVerified ? "Verified" : "verify"
                                }
                            </Badge>
                        </div>
                    </DropdownItem>
                    <DropdownItem textValue='verifyPhone' key="edit">
                        <div onClick={handlePhoneSend} className='flex justify-between'>
                            Verify Phone
                            <Badge color={user?.isPhoneVerified ? "success" : "failure"}>
                                {
                                    user?.isPhoneVerified ? "Verified" : "verify"
                                }
                            </Badge>
                        </div>
                    </DropdownItem>
                    <DropdownItem textValue='logout' onClick={handleLogout} key="delete" className="text-danger" color="danger">
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}

export default UserDropdown
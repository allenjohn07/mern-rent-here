import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Spinner } from "@nextui-org/react";
import { Badge } from "flowbite-react";
import { instance } from '../config/axios';
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import userLogo from '../assets/userLogo.png'


const UserDropdown = ({ handleLogout, name, email, menuToggler }) => {

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
        if(user?.isEmailVerified){
            toast.current.show({ severity: 'success', detail: "Email already verified", life: 3000 });
            return 
        }
        navigate("/verification/email")
        menuToggler()
    }


    const handlePhoneSend = () => {
        if(user?.isPhoneVerified){
            toast.current.show({ severity: 'success', detail: "Phone already verified", life: 3000 });
            return 
        }
        navigate("/verification/phone")
        menuToggler()
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
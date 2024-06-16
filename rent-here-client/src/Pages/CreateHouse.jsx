// 


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { instance } from '../config/axios';

const CreateHouse = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const mail = window.localStorage.getItem('email');
        if (!mail) {
            return;
        }
        setEmail(mail);
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    //async function to post house
    async function postHouse(data) {
        try {
            if (!email) {
                return Toast.fire({
                    icon: 'error',
                    title: 'Login to continue',
                });
            }

            const response = await instance.post('/houses/post-house', data);
            const result = response.data;
            if (result.message === 'House posted successfully') {
                Toast.fire({
                    icon: 'success',
                    title: 'House added Successfully',
                });

                setTimeout(() => {
                    navigate('/');
                    window.scrollTo(0, 0);
                }, 2000);

                reset();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: result.message || 'Failed to add house',
                });
            }
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: `An error occurred: ${error.message}`,
            });
        }
    }

    const onSubmit = (data) => {
        postHouse(data);
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-5 mb-20'>
            {/* form for submition */}
            <div className="w-full px-4 max-w-full flex-grow flex-1 text-center mb-10">
                <h3 className="text-base text-blueGray-700">Post A New House</h3>
            </div>
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16 rounded'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/* first row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Name</label>
                            <input type="text" defaultValue={"Sunny Villa"}
                                {...register("houseName", { required: "House Name is required" })} className="create-house-input"
                            />
                            {errors.houseName && <p className="text-red-500">{errors.houseName.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Type</label>
                            <select className='create-house-input' {...register("houseType", { required: "House Type is required" })}>
                                <option value="">Choose house type</option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Family">Family</option>
                            </select>
                            {errors.houseType && <p className="text-red-500">{errors.houseType.message}</p>}
                        </div>
                    </div>
                    {/* second row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Rent</label>
                            <input type="text" placeholder="1200"
                                {...register("minPrice", { required: "Minimum Rent is required" })} className="create-house-input"
                            />
                            {errors.minPrice && <p className="text-red-500">{errors.minPrice.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Rent</label>
                            <input type="text" placeholder='3000'
                                {...register("maxPrice", { required: "Maximum Rent is required" })} className="create-house-input"
                            />
                            {errors.maxPrice && <p className="text-red-500">{errors.maxPrice.message}</p>}
                        </div>
                    </div>
                    {/* third row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Rent Type</label>
                            <select className='create-house-input' {...register("priceType", { required: "Rent Type is required" })}>
                                <option value="">Choose rent type</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                            {errors.priceType && <p className="text-red-500">{errors.priceType.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Location</label>
                            <input type="text" placeholder='Ex: London'
                                {...register("location", { required: "House Location is required" })} className="create-house-input"
                            />
                            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                        </div>
                    </div>
                    {/* fourth row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Posting Date</label>
                            <input type="date" placeholder='Ex: 2024-10-05'
                                {...register("postingDate", { required: "Posting Date is required" })} className="create-house-input"
                            />
                            {errors.postingDate && <p className="text-red-500">{errors.postingDate.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Area (sqft)</label>
                            <input type="text" placeholder='Ex: 1000'
                                {...register("area", { required: "House Area is required" })} className="create-house-input"
                            />
                            {errors.area && <p className="text-red-500">{errors.area.message}</p>}
                        </div>
                    </div>
                    {/* fifth row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>House Description</label>
                        <textarea className='pl-3 w-full py-1.5 focus:outline-none text-gray-500' {...register("description", { required: "House Description is required" })} rows={3} placeholder='House Description' defaultValue={"Beautiful 3-bedroom, 2-bathroom home with a bright living room, modern kitchen, and private backyard. Includes central heating/cooling, two-car garage, and laundry room."}></textarea>
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Image</label>
                            <input type="url" placeholder='https://www.example.com/images/sample.jpg'
                                {...register("houseImage", { required: "House Image is required", pattern: { value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, message: "Invalid URL format" } })} className="create-house-input"
                            />
                            {errors.houseImage && <p className="text-red-500">{errors.houseImage.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House posted by</label>
                            <input type="email" defaultValue={email}
                                {...register("postedBy", { required: "Email is required" })} className="create-house-input"
                            />
                            {errors.postedBy && <p className="text-red-500">{errors.postedBy.message}</p>}
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <input type="submit" className='block font-semibold mt-8 bg-blue text-white px-8 py-2 rounded cursor-pointer hover:bg-blue/90' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateHouse;

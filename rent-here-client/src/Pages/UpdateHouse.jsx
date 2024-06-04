import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateHouse = () => {
    const { id } = useParams()
    const { _id, houseName, houseType, minPrice, maxPrice, priceType, location, postingDate, area, description, houseImage, postedBy } = useLoaderData()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    //async function to post house
    async function postHouse(data) {
        try {
            const response = await fetch(`https://mern-rent-here.onrender.com/update-house/${id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json()
            console.log(result);
            if (result.acknowledged === true) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "House updated Successfully"
                });

                setTimeout(() => {
                    navigate("/my-houses")
                    window.scrollTo(0, 0);
                }, 2500)
            }
            reset()
        } catch (error) {
            alert(`An error occurred:${error}`);
        }
    }

    const onSubmit = (data) => {
        postHouse(data)
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-5 mb-20'>
            {/* form for submition */}
            <div className="w-full px-4 max-w-full flex-grow flex-1 text-center mb-5">
                <h3 className="text-base text-blueGray-700">Update Your House</h3>
            </div>
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16 rounded'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/* first row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Name</label>
                            <input type="text" defaultValue={houseName}
                                {...register("houseName")} className="create-house-input"
                            />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Type</label>
                            <select className='create-house-input' {...register("houseType")} >
                                <option value={houseType}>{houseType}</option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                    </div>
                    {/* second row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Rent</label>
                            <input type="text" placeholder="1200"
                                {...register("minPrice")} className="create-house-input"
                                defaultValue={minPrice}
                            />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Rent</label>
                            <input type="text" placeholder='3000'
                                {...register("maxPrice")} className="create-house-input"
                                defaultValue={maxPrice}
                            />
                        </div>
                    </div>
                    {/* thrid row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Rent Type</label>
                            <select className='create-house-input' {...register("priceType")}>
                                <option value={priceType}>{priceType}</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Location</label>
                            <input type="text" placeholder='Ex: London'
                                {...register("location")} className="create-house-input"
                                defaultValue={location}
                            />
                        </div>
                    </div>
                    {/* fourth row */}
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Posting Date</label>
                            <input type="date" placeholder='Ex: 2024-10-05'
                                {...register("postingDate")} className="create-house-input"
                                defaultValue={postingDate}
                            />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Area (sqft)</label>
                            <input type="text" placeholder='Ex: 1000'
                                {...register("area")} className="create-house-input"
                                defaultValue={area}
                            />
                        </div>
                    </div>
                    {/* fifth row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>House Description</label>
                        <textarea className='pl-3 w-full py-1.5 focus:outline-none text-gray-500' {...register("description")} rows={3} placeholder='House Description' defaultValue={description}></textarea>
                    </div>
                    <div className='create-house-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House Image</label>
                            <input type="url" placeholder='https://www.example.com/images/sample.jpg'
                                {...register("houseImage")} className="create-house-input"
                                defaultValue={houseImage}
                            />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>House posted by</label>
                            <input type="email" placeholder='Ex: name@gmail.com'
                                {...register("postedBy")} className="create-house-input"
                                defaultValue={postedBy}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <input type="submit" className='block font-semibold mt-8 bg-blue text-white px-8 py-2 rounded cursor-pointer hover:bg-blue/90' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateHouse
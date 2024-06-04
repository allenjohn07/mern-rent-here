import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../Components/PageHeader'

const HouseDetails = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [house, setHouse] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)
        const fetchHouse = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/all-houses/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHouse(data);
            } catch (error) {
                console.error('Fetch error: ', error);
                // Optionally, set some error state here
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouse();
    }, []);

    const handleBookNow = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "center",
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
            title: "House booked successfully"
        });

        setTimeout(() => {
            navigate("/");
        }, 2500); 
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={"House Details"} path={"Details"}/>
            <div className='flex flex-col lg:flex-row items-start lg:items-center mt-4 mb-20'>
                <img
                    src={house.houseImage}
                    alt={house.houseName}
                    className='w-full lg:w-1/2 h-auto rounded-lg shadow-md'
                />
                <div className='lg:ml-8 mt-8 lg:mt-0'>
                    <h2 className='text-xl font-semibold'>House ID: {house._id}</h2>
                    <h1 className='text-3xl font-bold'>{house.houseName}</h1>
                    <p className='text-gray-700 mt-2'>{house.description}</p>
                    <p className='text-gray-600 mt-4'><strong>Type:</strong> {house.houseType}</p>
                    <p className='text-gray-600 mt-1'><strong>Location:</strong> {house.location}</p>
                    <p className='text-gray-600 mt-1'><strong>Price:</strong> ${house.minPrice} - ${house.maxPrice} {house.priceType}</p>
                    <p className='text-gray-600 mt-1'><strong>Area:</strong> {house.area} sqft</p>
                    <p className='text-gray-600 mt-1'><strong>Posted on:</strong> {new Date(house.postingDate).toLocaleDateString()}</p>
                    <p className='text-gray-600 mt-1'><strong>Posted by:</strong> {house.postedBy}</p>
                    <button
                        onClick={handleBookNow}
                        className='bg-blue hover:bg-blue/90 text-white font-bold py-2 px-4 rounded mt-6'
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HouseDetails
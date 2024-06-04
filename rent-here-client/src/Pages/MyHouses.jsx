import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SpinningCircles } from 'react-loading-icons'
import '../Pages/Styles/MyHouses.css'
import Swal from 'sweetalert2'


const MyHouses = () => {

    // const email = "allenjohnkonthuruthy@gmail.com"
    const [email, setEmail] = useState("")
    const [houses, setHouses] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4;

    //for displaying only the first 4 houses in the table
    const indexOfFirstElement = (currentPage - 1) * itemsPerPage
    const indexOfLastElement = indexOfFirstElement + itemsPerPage
    const currentHouses = houses.slice(indexOfFirstElement, indexOfLastElement)

    //function to next button
    const nextPage = () => {
        if (indexOfLastElement < houses.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    //function to previous button
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    //fetchHouse function written outside but called inside the useEffect hook
    async function fetchHousesbyEmail() {
        const response = await fetch(`http://localhost:5000/my-houses/${email}`)
        const data = await response.json()
        setHouses(data)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchHousesbyEmail()
    }, [email])

    //function to sort houses by the search input
    const handleSearch = () => {
        setIsLoading(true)
        if (searchText.length === 0) {
            window.location.reload()
        }
        const filter = houses.filter((house) => house.houseName.toLowerCase().includes(searchText.toLowerCase()))
        setHouses(filter)
        setIsLoading(false)
    }


    //function to delete a house
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-house/${id}`, {
                method: 'DELETE', // Ensure the correct HTTP method is used
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Log the status and response text if not OK
                const errorText = await response.text();
                console.error(`Error: ${response.status} - ${response.statusText}\n${errorText}`);
                return;
            }

            const data = await response.json();
            if (data.acknowledged === true) {
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
                    title: "House deleted Successfully"
                });

                setTimeout(() => {
                    navigate("/my-houses")
                    window.location.reload();
                }, 2500)
            }

        } catch (error) {
            console.error('Failed to delete the house:', error);
        }
    };


    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 main-div'>
            <div className='my-houses-container mb-5'>
                <h1 className='text-center py-4 mb-6'>All My Houses</h1>
                <div className='search-box p-2 mb-2 text-center flex flex-wrap lg:gap-10 gap-2 justify-center'>
                    <div className='flex items-center justify-center gap-2'>
                        <p>Enter your email</p>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name='email' id='email' className='py-1 pl-1 border rounded focus:outline-none email-box' placeholder='name@gmail.com' />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <p>Enter your search</p>
                        <input onChange={(e) => setSearchText(e.target.value)} type="text" name='search' id='search' className='py-1 pl-1 border rounded focus:outline-none ml-1 search-box' placeholder='Enter home to search' />
                        <button onClick={handleSearch} className='bg-blue text-white font-semibold px-2 py-1 rounded ml-1'>Search</button>
                    </div>
                </div>
            </div>

            {/* table to display the filtered houses */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        {
                            houses.length == 0 ? (
                                <div className='text-center mb-10 text-[#FF0000]'>
                                    <h2>Nothing to display...</h2>
                                    <p>Enter your posted email to search</p>
                                </div>
                            ) : null
                        }
                        <div className="rounded-t mb-0 px-4 py-3 border-0 table-container">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Houses</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to={"/post-house"}><button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post a new house</button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            House Name
                                        </th>
                                        <th className="pl-5 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            House Type
                                        </th>
                                        <th className="pl-10 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Rent
                                        </th>
                                        <th className="pl-9 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="pl-9 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>

                                {
                                    isLoading ? (
                                        <div className='flex items-center justify-center'><SpinningCircles /></div>
                                    ) : (
                                        <tbody>
                                            {currentHouses.map((house, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {house.houseName}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {house.houseType}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                        ${house.minPrice}-${house.maxPrice}
                                                    </td>
                                                    <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                        <Link to={`/edit-house/${house?._id}`}><button className='bg-blue rounded py-1 px-3 text-white'>Edit</button></Link>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                        <button onClick={() => handleDelete(house._id)} className='bg-red-700 py-1 px-3 text-white rounded'>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )
                                }

                            </table>
                        </div>
                    </div>
                </div>

                {/* next button */}
                {
                    currentPage === 1 ? <div className='text-center mb-10 '><button className="hover-underline" onClick={nextPage} disabled={currentPage === Math.ceil(currentHouses / itemsPerPage || houses.length <= itemsPerPage)}>Next</button></div> : <div className='text-center mb-10'><button className="hover-underline" onClick={previousPage}>Previous</button></div>
                }


            </section>
        </div>
    )
}

export default MyHouses
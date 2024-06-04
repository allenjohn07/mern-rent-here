import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/PageHeader'

const RentEstimate = () => {

    const [searchText, setSearchText] = useState("")
    const [rent, setRent] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("rent.json");
            const data = await response.json();
            setRent(data);
        };

        fetchData();

    }, []);


    const handleSearch = () => {
        if (searchText.length === 0) {
            window.location.reload()
        }
        const filter = rent.filter((house) => house.title.toLowerCase().includes(searchText.toLowerCase()))
        console.log(filter);
        setRent(filter)
    }

    return (
        <div className='mx-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={"Rent Estimate"} path={"Rent"} />
            <div className='mt-5 text-center'>
                <div className='search-box p-2 text-center-mb-2'>
                    <input onChange={e => setSearchText(e.target.value)} type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
                    <button onClick={handleSearch} className='bg-blue text-white font-semibold px-8 py-2 rounded mb-4 ml-1'>Search</button>
                </div>
            </div>
            {/* display the rent via card */}
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 py-12 items-center'>
            {
                rent.map((data) => (
                    <div key={data.id} className='shadow px-4 py-8'>
                        <h4 className='text-xl font-semibold'>{data.title}</h4>
                        <p className='text-blue my-2 font-medium texy-lg'>{data.rent}</p>
                        <div className='flex flex-wrap gap-4'>
                            <a href="/" className='underline'>{data.status}</a>
                            <a href="/" className='underline'>{data.features}</a>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default RentEstimate
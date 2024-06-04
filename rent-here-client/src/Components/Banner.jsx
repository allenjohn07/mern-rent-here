import React from 'react'
import { FiSearch} from "react-icons/fi";

const Banner = ({query, handleInputChange}) => {

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14 text-center'>
            <h1 className='text-5xl font-bold text-primary mb-3'>Find your <span className='text-blue'>perfect rental home</span> today!</h1>
            <p className='text-lg text-black/70 mb-8'>Discover comfortable and affordable rental homes tailored to your needs.</p>
            <form>
                <div className='flex justify-center md:flex-row flex-col md:gap-2 gap-4'>
                    <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-gray-300  md:w-1/2 w-full'>
                        <input type="text" placeholder='What are you looking for ?' name='title' id='title'
                            className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm-leading-6'
                            onChange={handleInputChange} value={query}
                        />
                        <FiSearch className='absolute mt-2 ml-2 text-gray-400' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Banner
import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";


const NewsLetter = () => {
    return (
        <div>
            <div className='mb-20'>
                <h3 className='text-lg font-bold mb-2 flex items-center  gap-2'>
                    <FaEnvelopeOpenText />
                    Email me for more details</h3>
                <p className='text-base text-primary/70 mb-4'>We've recently upgraded our search functionality! Now, selected rent options are highlighted, making it easier for you to see your active selections and refine your house search effortlessly.
                    For more details, feel free to email us.</p>
                <div className='w-full space-y-4'>
                    <input className='w-full block py-2 pl-3 border rounded focus:outline-none' type="email" name='email' id='email' placeholder='example@gmail.com' />
                    <input className='w-full block py-2 pl-3 border rounded focus:outline-none bg-blue text-white cursor-pointer font-semibold' type="submit" value={"Subscribe"} />
                </div>
            </div>

            {/* second section */}
            <div>
                <h3 className='text-lg font-bold mb-2 flex items-center  gap-2'>
                    <FaRocket />
                    Get notifications</h3>
                <p className='text-base text-primary/70 mb-4'>Don't miss out on new listings and updates! Enable notifications to get alerted about the latest houses that match your search criteria.</p>
                <div className='w-full space-y-4'>
                    <input className='w-full block py-2 pl-3 border rounded focus:outline-none bg-blue text-white cursor-pointer font-semibold' type="submit" value={"Notify me"} />
                </div>
            </div>
        </div>
    )
}

export default NewsLetter
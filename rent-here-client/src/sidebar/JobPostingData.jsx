import React from 'react'
import InputField from '../Components/InputField'

const JobPostingData = ({ handleChange }) => {

    let now = new Date()
    let twenyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000)
    let sevenDaysAgo = new Date(now - 24 * 7 * 60 * 60 * 1000)
    let thirtyDaysAgo = new Date(now - 24 * 30 * 60 * 60 * 1000)

    //convert the dates to string
    twenyFourHoursAgo = twenyFourHoursAgo.toISOString().slice(0, 10)
    sevenDaysAgo = sevenDaysAgo.toISOString().slice(0, 10)
    thirtyDaysAgo = thirtyDaysAgo.toISOString().slice(0, 10)


    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Date of Posting</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="postingDate" value="" onChange={handleChange} />
                    <span className='checkmark'></span>All Time
                </label>
                <InputField handleChange={handleChange} value={twenyFourHoursAgo} title="Last 24 hours" name="postingDate" />
                <InputField handleChange={handleChange} value={sevenDaysAgo} title="Last 7 days" name="postingDate" />
                <InputField handleChange={handleChange} value={thirtyDaysAgo} title="Last 30 days" name="postingDate" />
            </div>
        </div>
    )
}

export default JobPostingData
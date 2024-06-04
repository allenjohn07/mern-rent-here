import React from 'react'
import InputField from '../Components/InputField'

const Location = ({handleChange}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Location</h4>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" name="location" value="" onChange={handleChange}/>
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value="London" title="London" name="location"/>
            <InputField handleChange={handleChange} value="New York" title="New York" name="location"/>
            <InputField handleChange={handleChange} value="Chicago" title="Chicago" name="location"/>
            <InputField handleChange={handleChange} value="Los Angeles" title="Los Angeles" name="location"/>
            <InputField handleChange={handleChange} value="Austin" title="Austin" name="location"/>
            <InputField handleChange={handleChange} value="Minneapolis" title="Minneapolis" name="location"/>
            <InputField handleChange={handleChange} value="Charleston" title="Charleston" name="location"/>
            <InputField handleChange={handleChange} value="Mumbai" title="Mumbai" name="location"/>
        </div>
    </div>
  )
}

export default Location
import React from 'react'
import InputField from '../Components/InputField'

const HouseType = ({handleChange}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>House Type</h4>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" name="houseType" value="" onChange={handleChange}/>
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value="Bachelors" title="Bachelors" name="houseType"/>
            <InputField handleChange={handleChange} value="Family" title="Family" name="houseType"/>
        </div>
    </div>
  )
}

export default HouseType
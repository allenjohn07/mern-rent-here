import React, { useState } from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import HouseType from './HouseType'
import '../sidebar/Styles/Sidebar.css'
import { BsFillFilterSquareFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const Sidebar = ({ handleChange, handleClick, currentButton }) => {

  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className='space-y-5'>
      <div onClick={()=> setFilterOpen(!filterOpen)} className='filter-container flex items-center justify-between shadow-md px-1 rounded'>
        <h3 className='text-lg font-bold'>Filters</h3>
        <div className='filter-toggle-icon'>
          {
            !filterOpen ? <BsFillFilterSquareFill /> : <MdClose />
          }
        </div>
      </div>
      <div className={filterOpen ? "block" : "hidden filterforbig"}>
        <Location handleChange={handleChange} />
        <Salary currentButton={currentButton} handleChange={handleChange} handleClick={handleClick} />
        <JobPostingData handleChange={handleChange} />
        <HouseType handleChange={handleChange} />
      </div>
    </div>
  )
}

export default Sidebar

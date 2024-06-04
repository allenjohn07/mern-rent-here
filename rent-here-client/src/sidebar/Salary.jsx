import React from 'react';
import Button from '../Components/Button';
import InputField from '../Components/InputField';

const Salary = ({ handleChange, handleClick, currentButton }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Rent <span className='border mx-1 px-2 bg-blue text-white rounded'>{currentButton ? currentButton : "All"}</span></h4>
      <div className='mb-4'>
        <Button onClickHandler={handleClick} value="" title="All" />
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>
      <div>
        <InputField handleChange={handleChange} value="" title="All" name="maxPrice" />
        <InputField handleChange={handleChange} value={1500} title="< 1500 $" name="maxPrice" />
        <InputField handleChange={handleChange} value={2200} title="< 2200 $" name="maxPrice" />
        <InputField handleChange={handleChange} value={2500} title="< 2500 $" name="maxPrice" />
      </div>
    </div>
  );
};

export default Salary;

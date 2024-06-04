import React from 'react'

const Button = ({onClickHandler, value, title}) => {
  return (
    <button name='priceType' onClick={onClickHandler} value={value} className={`px-4 py-1 border rounded text-base hover:bg-blue hover:text-white mx-1`}>
        {title}
    </button>
  )
}

export default Button
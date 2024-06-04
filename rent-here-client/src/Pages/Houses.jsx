import React from 'react'

const Houses = ({ result, length }) => {
  return (
    <>
      <h3 className='text-lg font-bold mb-2'>Showing {result.length} out of {length} results</h3>
      <section>{result}</section>
    </>
  )
}

export default Houses
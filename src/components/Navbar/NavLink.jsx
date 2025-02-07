import React from 'react'

const NavLink = () => {
  return (
    <div className="flex mt-5 md:mt-0  justify-between items-center">
      <ul className="flex-col space-y-5 md:space-y-0 flex md:flex-row w-full max-w-2xl md:gap-8 justify-between">
        <li className='font-semibold' >Categories</li>
        <li className='font-semibold'>Sale</li>
        <li className='font-semibold'>Clearance</li>
        <li className='font-semibold'>New stock</li>
        <li className='font-semibold'>Trending</li>
      </ul>
    </div>
  );
}

export default NavLink
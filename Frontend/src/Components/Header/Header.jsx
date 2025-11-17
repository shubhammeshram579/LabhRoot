import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div>
        <nav className='h-16 flex items-center justify-between bg-gray-800 px-5'>
            <div className='text-yellow-400 font-semibold'>
                LabhRoot
            </div>
            <div className='flex items-center justify-between gap-5'>
              <Link to="/" className='text-white'>Home</Link>
              <Link to="/order" className='text-white'>Order</Link>
                <select name="" id="" className='bg-gray-700'>
                  <option value="#">menu</option>
                  <option value="#"><Link to="/" className='text-white'>Account</Link></option>
                  <option value="#"><Link to="/" className='text-white'>Payment</Link></option>
                  <option value="#"><Link to="/" className='text-white'>Coins</Link></option>
                </select>
            </div>
        </nav>
      
    </div>
    </>
  )
}

export default Header

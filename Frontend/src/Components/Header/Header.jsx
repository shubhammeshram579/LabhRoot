import React from 'react'

const Header = () => {
  return (
    <>
    <div>
        <nav className='h-16 flex items-center justify-between bg-gray-800 px-5'>
            <div className='text-yellow-400 font-semibold'>
                LabhRoot
            </div>
            <div className='flex items-center justify-between gap-5'>
                <p className='text-white'>For-Enterprices</p>
                <p className='text-white'>Driver-Patner</p>
                <p className='text-white'>Support</p>
            </div>
        </nav>
      
    </div>
    </>
  )
}

export default Header

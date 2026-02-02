import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthCreateContext from "..//../Context/AuthCreateContext.js"

const Mainheader = () => {
  const {logout} = useContext(AuthCreateContext)
  return (
    <>
    <div>
        <nav className='h-16 flex items-center justify-between bg-gray-800 px-5'>
            <Link to="/home"><div className='text-yellow-400 font-semibold'>
                LabhRoot
            </div></Link>
            <div className='flex items-center justify-between gap-5'>
              <Link to="/home" className='text-white'>Home</Link>
              <Link to="/order" className='text-white'>Order</Link>
              <Link to="/" className='text-white'><button onClick={logout()}>logout</button></Link>
                <select name="" id="" className='bg-gray-700'>
                  <option value="#">menu</option>
                  <option value="#"><Link to="/" className='text-white'>Account</Link></option>
                  <option value="#"><Link to="/" className='text-white'>Payment</Link></option>
                  <option value="#"><Link to="/" className='text-white'>Coins</Link></option>
                  <Link to="/Login" className='text-white'><option value="Login">Login</option></Link>
                </select>
            </div>
        </nav>
      
    </div>
    </>
  )
}

export default Mainheader

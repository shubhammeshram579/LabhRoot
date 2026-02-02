import React, { useState,useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import img from "..//..//../public/dellevry.jpg"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import  AuthCreateContext  from "..//../Context/AuthCreateContext.js";

const Login = () => {
    const navigate = useNavigate()
    const  {login}  = useContext(AuthCreateContext);
    const [userform,setUserform] = useState({})

      const handelform = (e) => {
        const { name, value } = e.target;
        setUserform((values) => ({ ...values, [name]: value }));
        };


    const handelSumbit = async () => {
        try {
        //   const res = await axios.post(`http://localhost:8000/api/users/login`,
        //     userform,
        //     {withCredentials:true}
        //   );

        //   console.log("res",res)
          login(userform)


          setUserform({})



    
          
          navigate(`/home`)
        } catch (error) {
          console.log("api error ", error.message);
        }
      };


  return (
   <>
   <div className='flex items-center justify-center w-full min-h-screen '>
      <div className='flex items-center justify-center gap-4 bg-gray-100 px-2 py-2'>
        <div>
            <img src={img} alt="" className='h-[75vh] w-[27vw] object-cover' />
        </div>
        <div className='space-y-5'>
            <div>
            <h1 className='text-2xl font-semibold uppercase'>Welcome to LabhRouts</h1>
            <p>Sign in your account</p>
            </div>

            <form onSubmit={handelSumbit} className='bg-gray-100 px-5 py-2 space-y-3'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-md  font-medium'>Email</label>
                    <input className=' border-2 border-orange-700/20 rounded py-1' type="email" id="email" name="email" onChange={handelform} placeholder=' test123@gmail.com' />
                </div>
                <div className='flex flex-col pb-2'>
                    <label htmlFor="" className='text-md  font-medium'>Password</label>
                    <input className=' border-2 border-orange-700/20 rounded py-1' type="password" id="password" name="password" onChange={handelform} placeholder=' test@123' />
                    <div className='flex items-center  gap-2 mt-2 text-sm'>
                        <p><input type="checkbox" id="checkbox" name='checkbox' />Remember me</p>
                        <Link to="/" className='text-orange-500'>Forget Password ?</Link>
                    </div>
                </div>
                <button type="submit" className='py-2 bg-orange-300 px-5 rounded-lg'>Login</button>
            </form>
            <div className='flex items-center justify-start gap-4'>
                <p>sign in with</p>
            <FcGoogle className="w-6 h-6" />
<           FaFacebook className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <p>Don't have an account ? <span className='text-orange-500'><Link to="/Registers">Sign Up</Link></span></p>
            </div>
        </div>
      </div>
      </div>
      </>
  )
}

export default Login

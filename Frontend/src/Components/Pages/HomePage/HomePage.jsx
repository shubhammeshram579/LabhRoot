import React,{useContext} from 'react'
import Herosection from './Herosection'
import OurServices from './OurServices'
import {Navigate } from "react-router-dom";
import  AuthCreateContext  from "..//..//../Context/AuthCreateContext.js";

const HomePage = () => {
  // const {user} = useContext(AuthCreateContext);

  // if (user) {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div>
      <Herosection />
      <OurServices />
    </div>
  )
}

export default HomePage

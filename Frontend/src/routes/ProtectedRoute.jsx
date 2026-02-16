import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {loginSuccess} from "../ReduxAuth/authSlice"


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const [curentUser,setCurentUser] = useState(null)

  useEffect(() => {
    const fatchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/crrentUser`,
          {withCredentials:true}
        )

        // console.log(res.data)

        setCurentUser(res.data.data.user.refreshToken)

        dispatch(loginSuccess(res.data.data.user))
        
      } catch (error) {
        console.log("userMe api error",error)  
      }

    }

    fatchUser()

  },[])



  // const { isAuthenticated } = useSelector((state) => state.auth);
  
  // console.log("is", isAuthenticated);

  return curentUser ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;

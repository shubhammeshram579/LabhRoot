import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../ReduxAuth/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [curentUser, setCurentUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important


  // console.log("curentUser",curentUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/users/crrentUser",
          { withCredentials: true }
        );

        setCurentUser(res.data.data.user);
        dispatch(loginSuccess(res.data.data.user));
      } catch (error) {
        console.log("userMe api error", error);
      } finally {
        setLoading(false); // 🔥 stop loading after API
      }
    };

    fetchUser();
  }, []);

  // 🟢 Wait until API finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔐 Now check authentication
  return curentUser ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;
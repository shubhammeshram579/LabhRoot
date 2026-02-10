import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "..//../ReduxAuth/authSlice";
import api from "../../api/axios";

const LogoutBtn = () => {
  const navigat = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    const res = await api.post(`/users/logout`)

    dispatch(logout());
    navigat("/login");

    return res.data.data
  };


  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LogoutBtn;

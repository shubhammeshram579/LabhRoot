import React from "react";
import { Outlet } from "react-router-dom";
import Mainheader from "../Components/Header/Mainheader";

const Mainlayout = () => {
  return (
    <div>
      <Mainheader />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Mainlayout;

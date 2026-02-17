import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authlayout from "./Layouts/Authlayout";
import Mainlayout from "./Layouts/Mainlayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// pages
import Home from "./Components/Pages/HomePage/Home"
import HomePage from "./Components/Pages/HomePage/HomePage";
import CusOrder from "./Components/Pages/Order/CusOrder";
import TrucksDetails from "./Components/Pages/Trucks/TrucksDetails";
import VehicleBooking from "./Components/Pages/Trucks/FairEstimatedPage";
import BookingSuccefully from "./Components/Pages/Trucks/BookingSuccefully";
import DeliveryMap from "./Components/Pages/testchatgpt/DeliveryMap";
import TrackRider from "./Components/Pages/Testchatgpt/TrackRider";
import Login from "./Components/users/Login";
import Registers from "./Components/users/registers";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Public Hero Page */}
            {/* <Route  path="/" element={<Hero />}/> */}

            {/* Auth Routes */}
            <Route element={<Authlayout />}>
              <Route path="/" element={<Home />} />
              {/* <Route path="/Login" element={<Login />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/Registers" element={<Registers />} />
            </Route>

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Mainlayout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/order" element={<CusOrder />} />
              <Route path="/trucksDetails/:id" element={<TrucksDetails />} />
              <Route path="/VehicleBooking/:bookingId" element={<VehicleBooking />} />
              <Route path="/BookingSuccefully/:id" element={<BookingSuccefully />}/>
              <Route path="/DeliveryMap" element={<DeliveryMap />} />
              <Route path="/TrackRider" element={<TrackRider />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

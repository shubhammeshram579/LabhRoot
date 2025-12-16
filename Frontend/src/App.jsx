import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"


// pages
import Header from './Components/Header/Header'
import HomePage from './Components/Pages/HomePage/HomePage'
import CusOrder from "./Components/Pages/Order/CusOrder"
import TrucksDetails from "./Components/Pages/Trucks/TrucksDetails"
import VehicleBooking from './Components/Pages/Trucks/FairEstimatedPage'
import BookingSuccefully from './Components/Pages/Trucks/BookingSuccefully'
import DeliveryMap from './Components/Pages/testchatgpt/DeliveryMap'
import TrackRider from './Components/Pages/Testchatgpt/TrackRider'

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/order' element={<CusOrder />} />
          <Route path='/trucksDetails/:id' element={<TrucksDetails />} />
          <Route path='/VehicleBooking' element={<VehicleBooking />} />
          <Route path='/BookingSuccefully/:id' element={<BookingSuccefully />} />
          <Route path='/DeliveryMap' element={<DeliveryMap />} />
          <Route path='/TrackRider' element={<TrackRider />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

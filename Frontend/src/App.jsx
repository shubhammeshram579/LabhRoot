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
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

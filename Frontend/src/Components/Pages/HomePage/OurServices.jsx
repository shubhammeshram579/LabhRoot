import React from 'react'
import { Truck, MapPin, ChevronDown,ArrowRight, Package, Send, Box, Navigation } from "lucide-react";

const OurServices = () => {
  const deliveryServices = [
  {
    id: 1,
    title: "FedEx",
    description: "A global courier service known for fast international shipping and reliable parcel tracking."
  },
  {
    id: 2,
    title: "DHL Express",
    description: "An international express mail service providing quick and secure delivery across 220+ countries."
  },
  {
    id: 3,
    title: "Blue Dart",
    description: "One of India’s leading courier companies offering domestic and international logistics solutions."
  },
  {
    id: 4,
    title: "Delhivery",
    description: "A technology-driven logistics company providing end-to-end supply chain and e-commerce delivery."
  },
  {
    id: 5,
    title: "Amazon Logistics",
    description: "Amazon’s own delivery network ensuring fast and efficient delivery of packages to customers worldwide."
  }
];

  return (
    <div className='flex items-center justify-center flex-col bg-white'>
      <h5 className='text-black'>Our Services</h5>
      <div className=' h-[40vh] w-[73%] rounded-lg flex items-center justify-center gap-5'>
        {deliveryServices.map((item) => (

        
        <div key={item.id} className='bg-gray-300 h-60 w-56 rounded-lg flex items-start justify-center flex-col gap-5'>
        <h5 className='text-black mr-24 bg-gray-500 rounded-e-lg'>{item.title}</h5>
        <p className='text-black ml-2'>{item.description}</p>
        <button className='bg-gray-500 px-5 py-1 rounded-xl ml-2'><ArrowRight /></button>
        </div>
        ))}
      </div>
    </div>
  )
}

export default OurServices

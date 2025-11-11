import React from 'react'
import {ChevronDown} from "lucide-react"

const Herosection = () => {

    const vahicales = [
        {
            id:1,
            name:"Truck 1",
            imgae:"https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png"
        },
        {
            id:2,
            name:"Truck 2",
            imgae:"https://cdn.trucksfloor.com/vehicles/truck/trf/tata-intra-v30/tata-intra-v30-1.jpg"
        },
        {
            id:3,
            name:"Truck 3",
            imgae:"https://d3bslevwxw022c.cloudfront.net/buytrucknbus-tatamotors-com/cv/cv_online/VehicleImages/55459425AJSR/5599.webp"
        },
        {
            id:4,
            name:"Truck 4",
            imgae:"https://www.khtagencies.com/assets/img/others/intra/3_Intra%20v10_1_0.png"
        },
    ]



  return (
    <div className='min-h-screen'>
      <div>
        <img className='h-[65vh] w-full object-cover absolute z-10' src="https://nest-platform-assets.porter.in/trucks_45ca097c76_d72e44b1e8/trucks_45ca097c76_d72e44b1e8.webp" alt="" />
      </div>
      <div className='flex items-center justify-center'>
      <div  className='bg-white h-[35vh] w-[73%] relative z-30 mt-[26%] rounded-lg flex items-start justify-center gap-20'>
        <div className=' mt-5'>
           <p className='font-semibold text-black flex items-center justify-center gap-2'> City: <span className='flex items-center justify-center'>pune <ChevronDown /></span>  </p>
        </div>

        <div className='flex items-center justify-center gap-5 mt-14'>
            {vahicales.map((item) => (
            <div key={item.id} className='flex items-center justify-between flex-col gap-5 '>
                <img className='h-32 w-44 object-cover bg-gray-300 rounded-lg' src={item.imgae} alt="" />
                <h5 className='text-black'>{item.name}</h5>
            </div>
            ))}
        </div>

      </div>
      </div>
    </div>
  )
}

export default Herosection

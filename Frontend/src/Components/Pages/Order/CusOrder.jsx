import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "..//..//../api/axios"

const CusOrder = () => {
  const navigate = useNavigate();

  const [userOrder ,setUserOrder] = useState([])


  useEffect(() => {

    const fatchOrder = async () => {
      try {

        const res = await api.get(`/booking-order/bookingorderList`)

        console.log(res.data)

        setUserOrder(res?.data?.data)
        
      } catch (error) {
        console.log("api eror", error)
        
      }

    }

    fatchOrder();

  },[])



  // const Orders = [
  //   {
  //     id: 1,
  //     name: "Tata Ace",
  //     imgae:
  //       "https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png",
  //     capacity: 750,
  //     StartingPrice: 220,
  //     picupLocation: "mahalunge",
  //     dropLocation: "Shivajinagar",
  //   },
  //   {
  //     id: 2,
  //     name: "3 Weeler",
  //     imgae:
  //       "https://cdn.trucksfloor.com/vehicles/truck/trf/tata-intra-v30/tata-intra-v30-1.jpg",
  //     capacity: 500,
  //     StartingPrice: 150,
  //     picupLocation: "mahalunge",
  //     dropLocation: "Shivajinagar",
  //   },
  // ];





  const handelBtn = (id) => {
    navigate(`/BookingSuccefully/${id}`)
  }

  return (
    <>
      <div className=" grid grid-cols-4 px-20 py-10 ">
        {userOrder.map((item) => (
          <div key={item._id} className="bg-gray-200 h-full py-2 w-52 rounded">
            <img src={item.imgae || "https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png"} alt="" className="h-28 w-full object-cover rounded" />

            <div className="flex items-center justify-between gap-5 px-4 mt-3">
              <p className=" font-semibold text-sm">{item.vehicleName}</p>
              <p className="text-green-700 font-semibold">Order</p>
            </div>
            <div className="flex items-start justify-start flex-col px-5">
              {/* <p className="text-xs">PickUp: {item?.bookingAddressId?.pickup}</p> */}
              {/* <p className="text-xs">Drop: {item?.bookingAddressId?.drop}</p> */}
            </div>
            <div className="flex items-start justify-start flex-col px-5">
               <p>goods: {item.goodsTypes}</p>
              <p>Price: {item.paidprice}</p>
             
            </div>
            <div className="flex items-center justify-center mt-4 px-5">
            <button onClick={() => handelBtn(item.id)} className="bg-yellow-600 text-white rounded w-full">Track order</button>
            </div>
          </div>
        ))}
      </div>
      ;
    </>
  );
};

export default CusOrder;

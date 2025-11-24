import React from "react";
import { useNavigate } from "react-router-dom";

const CusOrder = () => {
  const navigate = useNavigate();
  const Orders = [
    {
      id: 1,
      name: "Tata Ace",
      imgae:
        "https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png",
      capacity: 750,
      StartingPrice: 220,
      picupLocation: "mahalunge",
      dropLocation: "Shivajinagar",
    },
    {
      id: 2,
      name: "3 Weeler",
      imgae:
        "https://cdn.trucksfloor.com/vehicles/truck/trf/tata-intra-v30/tata-intra-v30-1.jpg",
      capacity: 500,
      StartingPrice: 150,
      picupLocation: "mahalunge",
      dropLocation: "Shivajinagar",
    },
  ];


  const handelBtn = (id) => {
    navigate(`/BookingSuccefully/${id}`)
  }

  return (
    <>
      <div className=" grid grid-cols-5 px-20 py-10">
        {Orders.map((item) => (
          <div key={item.id} className="bg-white h-64 w-52 rounded">
            <img src={item.imgae} alt="" className="h-28 w-full object-cover rounded" />

            <div className="flex items-center justify-between gap-5 px-4 mt-3">
              <p className=" font-semibold text-xl">{item.name}</p>
              <p className="text-green-700 font-semibold">Order</p>
            </div>
            <div className="flex items-start justify-start flex-col px-5">
              <p>PickUp: {item.picupLocation}</p>
              <p>Drop: {item.dropLocation}</p>
            </div>
            <div className="flex items-center justify-center mt-4 px-5">
            <button onClick={() => handelBtn(item.id)} className="bg-gray-300 rounded w-full">Track order</button>
            </div>
          </div>
        ))}
      </div>
      ;
    </>
  );
};

export default CusOrder;

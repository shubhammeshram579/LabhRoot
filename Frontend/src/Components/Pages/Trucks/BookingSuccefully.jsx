import React, { useState,useEffect } from "react";
import { Phone, MapPin, CheckCircle, XCircle } from "lucide-react";

 const  BookingSuccefully = () => {
  const [bookingCancelled, setBookingCancelled] = useState(false);
  const [isshow,setIsshow] = useState(true)
  const [rebooking, setRebooking] = useState(false);
  const [driverLocation, setDriverLocation] = useState({ lat: 18.5616, lng: 73.7897 });

  const driver = {
    name: "Rahul Patil",
    phone: "9876543210",
    vehicle: "Tata Ace (Open)",
  };

  const booking = {
    bookingId: "BK20241122PUNE1234",
    pickup: "Mahalunge, Pune, Maharashtra, India",
    drop: "Shivajinagar, Pune, Maharashtra, India",
    date: "22 Nov 2024",
    time: "2:45 PM",
    payment: "Cash",
    amount: "₹859",
  };


  // Simulate live location movement
    useEffect(() => {
    const interval = setInterval(() => {
    setDriverLocation((prev) => ({
    lat: prev.lat + (Math.random() - 0.5) * 0.0005,
    lng: prev.lng + (Math.random() - 0.5) * 0.0005,
    }));
    }, 20000);
    return () => clearInterval(interval);
    }, []);


    const handelCancelBooking  = () => {
      setBookingCancelled(true)
    }

    const handelRebooking  = () => {
      setRebooking(true)
      setBookingCancelled(false)
    }

    const handelcancl = () => {
      setIsshow(false)
    }

    const handelback = () => {
      setIsshow(true)
    }

  return (

    <>
    {isshow === false && 
       <div className="min-h-screen flex items-center justify-center bg-white/50">
        <div className="flex items-center flex-col bg-white rounded-lg py-5 px-5">
          <h1 className="text-3xl">Why do you want cancel?</h1>
          <div className="ml-2 mt-4">
          <p className="text-lg"><input type="checkbox"  className="rounded mr-2" />Driver was not Allocated</p>
          <p className="text-lg"><input type="checkbox" className="rounded mr-2" />Change my mind</p>
          <p className="text-lg"><input type="checkbox" className="rounded mr-2" />My reason  is not listed</p>

          <textarea name="" id="" cols={40} rows={2}></textarea>

          <div className="flex items-center justify-center gap-5  mt-5">
            <button onClick={handelback} className="bg-gray-300 rounded-lg px-2 py-2 w-full">Go back</button>
            <button onClick={handelRebooking} className="bg-red-600 px-2 py-2 rounded-lg w-full text-white">confirm Cancel</button>
          </div>
          </div>

          
        </div>
        </div>
        }

    {isshow === true &&
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
        <div className="w-full min-h-screen mx-2">
          <div className="w-full h-[85vh] rounded-xl overflow-hidden border px-5 py-2 bg-white">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${driverLocation.lat},${driverLocation.lng}&z=15&output=embed`}
          ></iframe>
        </div>
        </div>
        
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-2xl p-8 relative">
        {/* Success or Cancel Banner */}
        <div className="flex items-center gap-3 mb-6">
          {bookingCancelled ? (
            <XCircle size={34} className="text-red-600" />
          ) : (
            <CheckCircle size={34} className="text-green-600" />
          )}
          <h1 className="text-2xl font-bold">
            {bookingCancelled ? "Booking Cancelled" : "Booking Successful"}
          </h1>
        </div>

        {/* DRIVER DETAILS */}
        {!bookingCancelled && (
          <div className="border p-4 rounded-xl mb-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Driver Details</h2>

            <div className="flex justify-between text-sm mb-2">
              <p className="font-medium">Driver Name</p>
              <p>{driver.name}</p>
            </div>

            <div className="flex justify-between text-sm mb-2 items-center">
              <p className="font-medium">Phone Number</p>
              <div className="flex items-center gap-2">
                <Phone size={16} /> {driver.phone}
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <p className="font-medium">Vehicle</p>
              <p>{driver.vehicle}</p>
            </div>
          </div>
        )}

        {/* BOOKING DETAILS */}
        <div className="border p-4 rounded-xl mb-6 bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <p className="font-medium">Booking ID</p>
              <p>{booking.bookingId}</p>
            </div>

            <div className="flex justify-between items-start">
              <p className="font-medium flex items-center gap-1"><MapPin size={16} className="text-green-600" /> Pickup</p>
              <p className="text-right w-1/2">{booking.pickup}</p>
            </div>

            <div className="flex justify-between items-start">
              <p className="font-medium flex items-center gap-1"><MapPin size={16} className="text-red-600" /> Drop</p>
              <p className="text-right w-1/2">{booking.drop}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Date</p>
              <p>{booking.date}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Time</p>
              <p>{booking.time}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Payment Mode</p>
              <p>{booking.payment}</p>
            </div>

            <div className="flex justify-between text-lg font-bold mt-2">
              <p>Amount</p>
              <p>{booking.amount}</p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        {/* {!bookingCancelled && ( */}
          <button
            onClick={handelcancl}
            className="w-full bg-gray-200 text-red-500 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 hover:text-white"
          >
            Cancel Booking
          </button>
        {/* )} */}

        
        {/* {rebooking && ( */}
          {/* <button
            onClick={() => setBookingCancelled(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Rebook Again
          </button> */}
        {/* )} */}
      </div> 
    </div>}
    </>
  );
}


export default BookingSuccefully


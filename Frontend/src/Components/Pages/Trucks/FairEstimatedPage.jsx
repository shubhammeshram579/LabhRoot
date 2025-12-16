import React, { useState } from "react";
import { MapPin, Phone, X, ChevronRight,CreditCard,Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function VehicleBooking() {
  const navigat = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState("open");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGoodsModal, setShowGoodsModal] = useState(false);
  const [selectCategory ,setSelectCategory] = useState("");
  const [paymentmode ,setPayementmode] = useState("")

  const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [pickupSug, setPickupSug] = useState([]);
    const [dropSug, setDropSug] = useState([]);
    console.log(pickup)
    console.log(pickupSug)

  const [editData, setEditData] = useState({
    address: "Shivajinagar, Pune, Maharashtra, India",
    house: "",
    name: "Shubham meshram",
    phone: "7038956822",
  });

  const goodsTypes = [
    "Timber / Plywood / Laminate",
    "Electrical / Electronics / Home Appliances",
    "General",
    "Building / Construction",
    "Catering / Restaurant / Event Management",
    "Machines / Equipments / Spare Parts / Metals",
    "Textile / Garments / Fashion Accessories",
    "Furniture / Home Furnishing",
    "House Shifting",
  ];

  const handelCategorySelect = (g) => {
    setSelectCategory(g)
  }

  const handelClose = () => {
    setShowGoodsModal(false)
    setSelectCategory("")
  }

  const handelClose2 = () => {
    setShowGoodsModal(false)
  }

  const handelBooking = () => {
    navigat(`/BookingSuccefully/:id`)
  }

  const vehicles = [
    {
      id: "open",
      title: "Tata Ace (Open)",
      price: 859,
      time: "14 min away",
      weight: "750 Kg",
      size: "7.0ft x 4.0ft x 5.0ft",
    },
    {
      id: "closed",
      title: "Tata Ace (Closed)",
      price: 828,
      time: "17 min",
      weight: "750 Kg",
      size: "7.0ft x 4.0ft x 5.0ft",
    },
    {
      id: "any",
      title: "Tata Ace (Any)",
      price: 828,
      time: "17 min",
      weight: "750 Kg",
      size: "7.0ft x 4.0ft x 5.0ft",
    },
  ];



  // ✅ Fetch Pickup suggestions
  const fetchPickup = async (text) => {
    setPickup(text);
    if (!text) return setPickupSug([]);

    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          country: "IN",
          limit: 5,
        },
      }
    );
    setPickupSug(res.data.features);
  };

  // ✅ Fetch Drop suggestions
  const fetchDrop = async (text) => {
    setDrop(text);
    if (!text) return setDropSug([]);

    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          country: "IN",
          limit: 5,
        },
      }
    );
    setDropSug(res.data.features);
  };

  return (
    <>
    <div className="w-full min-h-screen bg-gray-100 p-6 flex gap-6 relative">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Address Details</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-600 mt-1"><MapPin size={18} /></span>
            <div>
              <p className="font-semibold">Shubham meshram • 7038956822</p>
              <p className="text-sm text-gray-600">Mahalunge, Pune, Maharashtra, India</p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 ml-auto text-sm"
            >
              Edit
            </button>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-red-600 mt-1"><MapPin size={18} /></span>
            <div>
              <p className="font-semibold">Shubham meshram • 7038956822</p>
              <p className="text-sm text-gray-600">Shivajinagar, Pune, Maharashtra, India</p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 ml-auto text-sm"
            >
              Edit
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Fare Breakdown</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Trip Fare (incl. Toll, if applicable)</span>
            <span>₹858.55</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Net Fare</span>
            <span>₹859.00</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Amount Payable</span>
            <span>₹859.00</span>
          </div>
        </div>

        <button
          className="mt-4 text-blue-600 text-sm"
        >
          Select Goods Type
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {vehicles.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              className={`border rounded-xl p-4 cursor-pointer transition shadow-sm hover:shadow-md ${
                selectedVehicle === v.id ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{v.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{v.time}</p>
                  <p className="text-sm text-gray-700 mt-1">{v.weight} • {v.size}</p>
                </div>
                <p className="text-lg font-bold">₹ {v.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="font-semibold text-lg">Payment Method</p>
          <p className="font-bold text-lg">₹ 859</p>
        </div>

        <div className="flex items-center justify-start gap-1">
          {paymentmode === "cash" ? <Banknote  size={18} /> : <CreditCard size={18} /> }
          <select className="border-none outline-none" name="" id="" value={paymentmode} onChange={(e) => setPayementmode(e.target.value)}>
            <option value="cash"> Cash</option>
            <option value="online">Online</option>
          </select>
        </div>



        {!selectCategory.length > 0 ? <button  onClick={() => setShowGoodsModal(true)} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
          Select Goods Type
        </button> :
        <button onClick={handelBooking} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Book now</button>
        }
      </div>

      {/* EDIT MODAL */}
      {/* {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
            <button className="absolute right-4 top-4" onClick={() => setShowEditModal(false)}>
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit Drop location</h2>

            <div className="space-y-4">
              <div>

                
           
              <input
                className="w-full border p-3 rounded-lg"
                value={pickup}
                name="address"
                id="address"
                onChange={(e) => fetchPickup(e.target.value)}
                // onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />

              {pickupSug.length > 0 && (
                <div className="absolute top-full left-0 bg-white border w-full z-50 max-h-40 overflow-y-auto">
                  {pickupSug.map((item) => (
                    <p
                      key={item.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      onClick={() => {
                        setPickup(item.place_name);
                        setPickupSug([]);
                      }}
                    >
                      {item.place_name}
                    </p>
                  ))}
                </div>
              )}
              </div>

              <input
                className="w-full border p-3 rounded-lg"
                placeholder="House / Apartment (optional)"
                value={editData.house}
                onChange={(e) => setEditData({ ...editData, house: e.target.value })}
              />

              <input
                className="w-full border p-3 rounded-lg"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />

              <input
                className="w-full border p-3 rounded-lg"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
            </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
            >
              Confirm and Proceed
            </button>
          </div>
        </div>
      )} */}


      {/* EDIT MODAL */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
    <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

      <button
        className="absolute right-4 top-4"
        onClick={() => setShowEditModal(false)}
      >
        <X size={22} />
      </button>

      <h2 className="text-2xl font-bold mb-6">Edit Drop location</h2>

      <div className="space-y-4">

        {/* PICKUP LOCATION */}
        <div className="relative">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Pickup location"
            value={ pickup}
            onChange={(e) => {
              const value = e.target.value;
              setPickup(value);
              fetchPickup(value);
            }}
          />

          {pickupSug.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-md z-50 max-h-40 overflow-y-auto">
              {pickupSug.map((item) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onMouseDown={() => {
                    setPickup(item.place_name);
                    setPickupSug([]);
                  }}
                >
                  {item.place_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* HOUSE */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="House / Apartment (optional)"
          value={editData.house}
          onChange={(e) =>
            setEditData({ ...editData, house: e.target.value })
          }
        />

        {/* NAME */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
          value={editData.name}
          onChange={(e) =>
            setEditData({ ...editData, name: e.target.value })
          }
        />

        {/* PHONE */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Phone"
          value={editData.phone}
          onChange={(e) =>
            setEditData({ ...editData, phone: e.target.value })
          }
        />
      </div>

      <button
        onClick={() => setShowEditModal(false)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
      >
        Confirm and Proceed
      </button>
    </div>
  </div>
)}


      {/* GOODS TYPE MODAL */}
      {showGoodsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative max-h-[80vh] overflow-y-auto">
            <button className="absolute right-4 top-4" onClick={handelClose}>
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Select Goods Type</h2>

            <div className="space-y-4 mb-6">
              {goodsTypes.map((g, index) => (
                <div onClick={() => handelCategorySelect(g)} key={index} className="border-b pb-3 text-lg cursor-pointer hover:text-blue-600">
                  {g}
                </div>
              ))}
            </div>

            <button onClick={handelClose2}  className={`w-full ${selectCategory.length > 0 ? "bg-blue-600" : "bg-gray-300"} text-white py-3 rounded-lg text-lg font-semibold`}>
              Update category
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

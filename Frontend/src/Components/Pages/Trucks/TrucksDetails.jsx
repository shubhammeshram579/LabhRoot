import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const TrucksDetails = () => {
  const navigate = useNavigate();
  const [isShowing, setIsshowing] = useState(true);
  const [belowV, setBelowV] = useState([]);
  const [aboveV, setAbove] = useState([]);

  // ✅ Mapbox states
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupSug, setPickupSug] = useState([]);
  const [dropSug, setDropSug] = useState([]);

  const [city, setCity] = useState("Detecting...");
  const [isCityOpen, setIsCityOpen] = useState(false);

  const cityList = [
    "Pune",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Nagpur",
    "Chennai",
  ];

  // const handelEstimatedbtn = (e) => {
  //   e.preventdefault();
  //   navigate(`/VehicleBooking`);
  // };
  const handelEstimatedbtn = () => {
    // e.preventdefault();
    navigate(`/VehicleBooking`);
  };

  const vahicales = [
    {
      id: 1,
      name: "Tata Ace",
      imgae:
        "https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png",
      capacity: 750,
      StartingPrice: 220,
    },
    {
      id: 2,
      name: "3 Weeler",
      imgae:
        "https://cdn.trucksfloor.com/vehicles/truck/trf/tata-intra-v30/tata-intra-v30-1.jpg",
      capacity: 500,
      StartingPrice: 150,
    },
    {
      id: 3,
      name: "Tata 407",
      imgae:
        "https://d3bslevwxw022c.cloudfront.net/buytrucknbus-tatamotors-com/cv/cv_online/VehicleImages/55459425AJSR/5599.webp",
      capacity: 2500,
      StartingPrice: 750,
    },
    {
      id: 4,
      name: "Pickup 9ft",
      imgae:
        "https://www.khtagencies.com/assets/img/others/intra/3_Intra%20v10_1_0.png",
      capacity: 1700,
      StartingPrice: 470,
    },
  ];

  //   const handelbtn = async () => {
  //   setIsshowing(true)

  //   const respost = await vahicales.filter((item) => {
  //     const lessthen = item.capacity <= 750;
  //     return lessthen
  //   })
  //   setBelowV(respost)
  // }

  const handelbtn = () => {
    setIsshowing(true);
    setBelowV(vahicales.filter((item) => item.capacity <= 750));
  };

  const handelbtn2 = () => {
    setIsshowing(false);
    setAbove(vahicales.filter((item) => item.capacity > 750));
  };

  // console.log("belowV",belowV)

  //  const handelbtn2 = async () => {
  //   setIsshowing(false)
  //     const respost = await vahicales.filter((item) => {
  //     const lessthen = item.capacity > 750;
  //     return lessthen
  //   })
  //   setAbove(respost)
  // }

  useEffect(() => {
    handelbtn();
    handelbtn2();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
            {
              params: {
                access_token: MAPBOX_TOKEN,
              },
            }
          );

          const place = res.data.features.find((f) =>
            f.place_type.includes("place")
          );

          if (place) {
            setCity(place.text); // City name
          } else {
            setCity("Unknown");
          }
        } catch (err) {
          setCity("Location Error");
        }
      },
      () => {
        setCity("Permission Denied");
      }
    );
  }, []);

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
    <div className="min-h-screen">
      <div>
        <img
          src="https://www.dispatchtrack.com/hubfs/delivery%20logistics.webp"
          alt=""
          className="h-[70vh] w-full absolute z-10"
        />
        <div className="relative z-20 w-full px-[24vw] ">
          <p className="text-center text-2xl pt-5 text-black font-semibold">
            Get Convenient Mini Truck Online Booking in Pune Online truck
            booking service for goods transportation in Pune is now convenient
            and affordable with Porter. Let us cater to all your goods
            transportation needs. Book now with us. Know More
          </p>
        </div>
      </div>

      <div className=" relative z-20 mt-80 px-44 bg-white">
        {/* <div className="bg-white w-36 h-14 rounded-t-lg py-4 px-2">
          <button className="flex items-center text-black font-semibold">
            City: {city} <ChevronDown />
          </button>
        </div> */}

        <div className="bg-white w-40 h-14 rounded-t-lg py-4 px-2 relative">
          <button
            type="button"
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="flex items-center text-black font-semibold justify-between w-full"
          >
            City: {city}
            <ChevronDown />
          </button>

          {isCityOpen && (
            <div className="absolute top-full left-0 bg-white border w-full rounded shadow z-50">
              {cityList.map((c, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setCity(c);
                    setIsCityOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
                >
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-100 w-full h-44 rounded px-5">
          <form className="flex items-center justify-between px-2 py-10">
            {/* <div className="flex flex-col border-r-2 pr-4">
                    <label htmlFor="" className="text-black font-semibold">Pickup Address <span className="text-red-500">*</span> </label>
                    <input onChange={(e) => fetchPickup(e.target.value)} className=" border-2 border-gray-300 rounded text-black" type="text" placeholder="enter Pickup address" required  />

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
                </div> */}

            {/* ✅ Pickup Input */}
            <div className="flex flex-col relative border-r-2 pr-4">
              <label className="text-black font-semibold">
                Pickup Address <span className="text-red-500">*</span>
              </label>

              <input
                className="border-2 border-gray-300 rounded text-black px-2 py-1"
                type="text"
                value={pickup}
                onChange={(e) => fetchPickup(e.target.value)}
                placeholder="Enter Pickup address"
                required
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

            {/* ✅ Drop Input */}
            <div className="flex flex-col relative border-r-2 pr-4">
              <label className="text-black font-semibold">
                Drop Address <span className="text-red-500">*</span>
              </label>

              <input
                className="border-2 border-gray-300 rounded text-black px-2 py-1"
                type="text"
                value={drop}
                onChange={(e) => fetchDrop(e.target.value)}
                placeholder="Enter Drop address"
                required
              />

              {dropSug.length > 0 && (
                <div className="absolute top-full left-0 bg-white border w-full z-50 max-h-40 overflow-y-auto">
                  {dropSug.map((item) => (
                    <p
                      key={item.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      onClick={() => {
                        setDrop(item.place_name);
                        setDropSug([]);
                      }}
                    >
                      {item.place_name}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="flex flex-col border-r-2 pr-4">
                    <label htmlFor="" className="text-black font-semibold">Drop Address <span className="text-red-500">*</span></label>
                    <input onChange={(e) => fetchDrop(e.target.value)} className=" border-2 border-gray-300 rounded text-black" type="text" placeholder="enter drop address" required />
                    {dropSug.length > 0 && (
                      <div className="absolute top-full left-0 bg-white border w-full z-50 max-h-40 overflow-y-auto">
                        {dropSug.map((item) => (
                          <p
                            key={item.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                            onClick={() => {
                              setDrop(item.place_name);
                              setDropSug([]);
                            }}
                          >
                            {item.place_name}
                          </p>
                        ))}
                      </div>
                    )}
                </div> */}
            <div className="flex flex-col border-r-2 pr-4">
              <label htmlFor="" className="text-black font-semibold">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className=" border-2 border-gray-300 rounded text-black"
                type="text"
                placeholder="enter name"
                required
              />
            </div>
            <div className="flex flex-col border-r-2 pr-4">
              <label htmlFor="" className="text-black font-semibold">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                className=" border-2 border-gray-300 rounded text-black"
                type="number"
                placeholder="enter Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-black font-semibold">
                What best describe you? <span className="text-red-500">*</span>
              </label>
              <select
                name=""
                id=""
                className="border-2 border-gray-300 rounded text-black"
              >
                <option value="Personal" className="text-black">
                  Personal
                </option>
                <option value="Personal" className="text-black">
                  Business
                </option>
              </select>
            </div>
            <button
              onClick={handelEstimatedbtn}
              className="bg-blue-500 px-3 py-1 rounded-lg mt-5 text-white"
            >
              Get Fair Estimeted
            </button>
          </form>
        </div>
      </div>

      <div className="min-h-[60vh] bg-white flex items-center justify-start flex-col pt-5">
        <h1 className="font-semibold text-3xl text-gray-700">
          more mini vehicals in pune
        </h1>
        <div className="mt-5">
          <button
            className={`border-b-2 ${
              isShowing == true
                ? "border-gray-500 font-semibold"
                : "border-gray-50"
            } text-gray-500 px-2 py-1`}
            onClick={handelbtn}
          >{`Light (below 750kg)`}</button>
          <button
            className={`border-b-2 ${
              !isShowing == true
                ? "border-gray-500 font-semibold"
                : "border-gray-50"
            } text-gray-500 px-2 py-1`}
            onClick={handelbtn2}
          >{`Heavy (above 750kg)`}</button>
        </div>

        <div>
          {isShowing == true ? (
            <div className="flex items-center justify-center gap-5 mt-5">
              {belowV.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 rounded-lg px-2 py-1 flex items-center justify-center flex-col gap-2"
                >
                  <img
                    className="h-32 w-52 object-cover"
                    src={item.imgae}
                    alt=""
                  />
                  <p className="text-black font-semibold">{item.capacity}kg</p>
                  <p className="text-black font-semibold text-xl">
                    {item.name}
                  </p>
                  <p className="text-black">
                    Starting from: ₹{item.StartingPrice}
                  </p>
                  <button className="text-blue-500">know more</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5 mt-5">
              {aboveV.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 rounded-lg px-2 py-1 flex items-center justify-center flex-col gap-2"
                >
                  <img
                    className="h-32 w-52 object-cover"
                    src={item.imgae}
                    alt=""
                  />
                  <p className="text-black font-semibold">{item.capacity}kg</p>
                  <p className="text-black font-semibold text-xl">
                    {item.name}
                  </p>
                  <p className="text-black">
                    Starting from: ₹{item.StartingPrice}
                  </p>
                  <button className="text-blue-500">know more</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrucksDetails;

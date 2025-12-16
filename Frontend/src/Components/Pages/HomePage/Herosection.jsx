import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const Herosection = () => {
  const navigate = useNavigate();

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

  const vahicales = [
    {
      id: 1,
      name: "Truck 1",
      imgae:
        "https://offers.caimahindra.com/uploads/product/maxx-pik-up-white.png",
    },
    {
      id: 2,
      name: "Truck 2",
      imgae:
        "https://cdn.trucksfloor.com/vehicles/truck/trf/tata-intra-v30/tata-intra-v30-1.jpg",
    },
    {
      id: 3,
      name: "Truck 3",
      imgae:
        "https://d3bslevwxw022c.cloudfront.net/buytrucknbus-tatamotors-com/cv/cv_online/VehicleImages/55459425AJSR/5599.webp",
    },
    {
      id: 4,
      name: "Truck 4",
      imgae:
        "https://www.khtagencies.com/assets/img/others/intra/3_Intra%20v10_1_0.png",
    },
  ];

  const HandelClickTruck = (id) => {
    navigate(`/trucksDetails/${id}`);
  };

  return (
    <div className="min-h-screen">
      <div>
        <img
          className="h-[65vh] w-full object-cover absolute z-10"
          src="https://nest-platform-assets.porter.in/trucks_45ca097c76_d72e44b1e8/trucks_45ca097c76_d72e44b1e8.webp"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white h-[35vh] w-[73%] relative z-30 mt-[26%] rounded-lg flex items-start justify-center gap-20">
          {/* <div className=' mt-5'>
           <p className='font-semibold text-black flex items-center justify-center gap-2'> City: <span className='flex items-center justify-center'>pune <ChevronDown /></span>  </p>
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

          <div className="flex items-center justify-center gap-5 mt-14">
            {vahicales.map((item) => (
              <div
                onClick={() => HandelClickTruck(item.id)}
                key={item.id}
                className="flex items-center justify-between flex-col gap-5 "
              >
                <img
                  className="h-32 w-44 object-cover bg-gray-300 rounded-lg"
                  src={item.imgae}
                  alt=""
                />
                <h5 className="text-black">{item.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;

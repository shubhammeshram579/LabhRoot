import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Phone, MapPin, CheckCircle, XCircle } from "lucide-react";
import io from "socket.io-client";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

console.log("Mapbox Token:", import.meta.env.VITE_MAPBOX_TOKEN);
// const socket = io("http://localhost:5000");

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const BookingSuccefully = () => {
  const mapContainerRef = useRef(null);
  const pendingRouteRef = useRef(null);
  const mapRef = useRef(null);
  const driverMarkerRef = useRef(null);

  const [eta, setEta] = useState(null);
  const [isshow, setIsshow] = useState(true);
  const [bookingCancelled, setBookingCancelled] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 📍 STATIC COORDS (later geocode dynamically)
  const pickupCoords = { lat: 18.5642, lng: 73.7769 };
  const dropCoords = { lat: 18.5308, lng: 73.8475 };

  const driver = {
    name: "Rahul Patil",
    phone: "9876543210",
    vehicle: "Tata Ace (Open)",
  };

  const booking = {
    bookingId: "BK20241122PUNE1234",
    pickup: "Mahalunge, Pune, Maharashtra, India",
    drop: "Shivajinagar, Pune, Maharashtra, India",
    amount: "₹859",
  };




useEffect(() => {
  if (!mapContainerRef.current || mapRef.current) return;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [pickupCoords.lng, pickupCoords.lat],
    zoom: 13,
  });

  mapRef.current = map;

  map.on("load", () => {
    console.log("✅ Map fully loaded");

    // 👉 Load image
    map.loadImage("/image.png", (error, image) => {
      if (error) return console.error(error);

      if (!map.hasImage("truck-icon")) {
        map.addImage("truck-icon", image);
      }

      // 👉 ADD DRIVER SOURCE ONLY AFTER IMAGE + STYLE
      map.addSource("driver", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [pickupCoords.lng, pickupCoords.lat],
          },
          properties: {
            bearing: 0,
          },
        },
      });

      map.addLayer({
        id: "driver-layer",
        type: "symbol",
        source: "driver",
        layout: {
          "icon-image": "truck-icon",
          "icon-size": 0.08,
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
        },
      });

      setMapLoaded(true); // 🔥 SET AFTER EVERYTHING
    });

    // Pickup & Drop markers
    new mapboxgl.Marker({ color: "green" })
      .setLngLat([pickupCoords.lng, pickupCoords.lat])
      .addTo(map);

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([dropCoords.lng, dropCoords.lat])
      .addTo(map);
  });

  return () => {
    map.remove();
    mapRef.current = null;
  };
}, []);



const getBearing = (start, end) => {
  const toRad = deg => (deg * Math.PI) / 180;
  const toDeg = rad => (rad * 180) / Math.PI;

  const dLon = toRad(end[0] - start[0]);
  const lat1 = toRad(start[1]);
  const lat2 = toRad(end[1]);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

const lastPositionRef = useRef(null);


const drawRoute = (coordinates) => {
  const map = mapRef.current;
  if (!map || !mapLoaded) return;

  if (map.getSource("route")) {
    map.getSource("route").setData({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
    });
    return;
  }

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
    },
  });

  map.addLayer({
    id: "route-layer",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#2563eb",
      "line-width": 4,
    },
  });
};


const trackingStartedRef = useRef(false);
const fullRouteRef = useRef([]);
const routeIndexRef = useRef(0);



const getClosestRouteIndex = (route, point) => {
  let minDist = Infinity;
  let closestIndex = 0;

  route.forEach((coord, index) => {
    const dx = coord[0] - point[0];
    const dy = coord[1] - point[1];
    const dist = dx * dx + dy * dy;

    if (dist < minDist) {
      minDist = dist;
      closestIndex = index;
    }
  });

  return closestIndex;
};



useEffect(() => {
  if (!mapLoaded || trackingStartedRef.current) return;

  trackingStartedRef.current = true;
  socket.emit("startTracking");

  socket.on("routeData", ({ coordinates, duration }) => {
  fullRouteRef.current = coordinates;
  routeIndexRef.current = 0;

  setEta(Math.ceil(duration / 60));
  drawRoute(coordinates);
});


socket.on("driverLocation", ({ lat, lng }) => {
  const map = mapRef.current;
  if (!map || !mapLoaded) return;

  /* ---------------- DRIVER ICON ---------------- */
  const driverSource = map.getSource("driver");
  if (!driverSource) return;

  let bearing = 0;
  if (lastPositionRef.current) {
    bearing = getBearing(
      lastPositionRef.current,
      [lng, lat]
    );
  }

  lastPositionRef.current = [lng, lat];

  driverSource.setData({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: { bearing },
  });

  /* ---------------- ROUTE MOVE ---------------- */
  if (fullRouteRef.current.length > 0) {
    const index = getClosestRouteIndex(
      fullRouteRef.current,
      [lng, lat]
    );

    const remainingRoute = fullRouteRef.current.slice(index);

    if (remainingRoute.length > 1) {
      const routeSource = map.getSource("route");
      if (routeSource) {
        routeSource.setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: remainingRoute,
          },
        });
      }
    }
  }

  /* ---------------- CAMERA FOLLOW ---------------- */
  map.easeTo({
    center: [lng, lat],
    duration: 1000,
  });
});


  socket.on("tripCompleted", () => {
    alert("📦 Delivery completed");
  });

  socket.on("etaUpdate", setEta);

  return () => {
    socket.off("routeData");
    socket.off("driverLocation");
    socket.off("tripCompleted");
    socket.off("etaUpdate");
  };
}, [mapLoaded]);



  return (
    <>
      {isshow && (
        <div className="min-h-screen bg-gray-100 p-6 flex gap-4">
          {/* 🗺️ MAP */}
          <div className="w-2/3 h-[85vh] rounded-xl overflow-hidden border bg-white">
            <div ref={mapContainerRef} className="w-full h-full"  />

          </div>

          {/* 📄 DETAILS */}
          <div className="bg-white w-1/3 shadow-lg rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {bookingCancelled ? (
                <XCircle size={32} className="text-red-600" />
              ) : (
                <CheckCircle size={32} className="text-green-600" />
              )}
              <h1 className="text-xl font-bold">
                {bookingCancelled ? "Booking Cancelled" : "Booking Successful"}
              </h1>
            </div>

            <div className="flex justify-between font-semibold mb-4">
              <span>ETA</span>
              <span>{eta ? `${eta} mins` : "Calculating..."}</span>
            </div>

            {!bookingCancelled && (
              <div className="border p-4 rounded-xl mb-4 bg-gray-50">
                <h2 className="font-semibold mb-2">Driver Details</h2>
                <p>{driver.name}</p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={14} /> {driver.phone}
                </p>
                <p className="text-sm">{driver.vehicle}</p>
              </div>
            )}

            <div className="border p-4 rounded-xl bg-gray-50 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ID</span>
                <span>{booking.bookingId}</span>
              </div>

              <div className="flex gap-2">
                <MapPin size={14} className="text-green-600" />
                {booking.pickup}
              </div>

              <div className="flex gap-2">
                <MapPin size={14} className="text-red-600" />
                {booking.drop}
              </div>

              <div className="flex justify-between font-bold">
                <span>Amount</span>
                <span>{booking.amount}</span>
              </div>
            </div>

            <button
              onClick={() => setIsshow(false)}
              className="mt-6 w-full bg-gray-200 text-red-500 py-3 rounded-lg hover:bg-red-600 hover:text-white"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      )}

      <button
  onClick={() => {
    socket.disconnect();
    setIsshow(false);
  }}
>dddd</button>
    </>
  );
};

export default BookingSuccefully;

// components/DeliveryMap.jsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const DeliveryMap = () => {
  const mapContainer = useRef();
  const map = useRef();
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.9629, 20.5937], // India
      zoom: 5,
    });

    // Pickup Search
    const pickupGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Search Pickup Location",
    });

    // Drop Search
    const dropGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Search Drop Location",
    });

    document.getElementById("pickup").appendChild(pickupGeocoder.onAdd(map.current));
    document.getElementById("drop").appendChild(dropGeocoder.onAdd(map.current));

    pickupGeocoder.on("result", (e) => {
      setPickup(e.result.geometry.coordinates);
    });

    dropGeocoder.on("result", (e) => {
      setDrop(e.result.geometry.coordinates);
    });
  }, []);

  const drawRoute = async () => {
    if (!pickup || !drop) return;

    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.join(",")};${drop.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );

    const route = res.data.routes[0].geometry;

    if (map.current.getSource("route")) {
      map.current.getSource("route").setData({
        type: "Feature",
        geometry: route,
      });
    } else {
      map.current.addSource("route", {
        type: "geojson",
        data: { type: "Feature", geometry: route },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: { "line-color": "#3b82f6", "line-width": 5 },
      });
    }
  };

  useEffect(() => {
    if (pickup && drop) drawRoute();
  }, [pickup, drop]);

  return (
    <div className="h-screen w-full">
      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow w-[300px] z-10">
        <div id="pickup" className="mb-2" />
        <div id="drop" className="mb-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Book Delivery
        </button>
      </div>

      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default DeliveryMap;

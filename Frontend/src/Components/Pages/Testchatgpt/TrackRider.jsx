import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import mapboxgl from "mapbox-gl";

const socket = io("http://localhost:5000");

const TrackRider = ({ orderId }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    socket.on("trackLocation", (data) => {
      if (data.orderId === orderId) {
        const { lng, lat } = data;

        if (!markerRef.current) {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(window.mapInstance);
        } else {
          markerRef.current.setLngLat([lng, lat]);
        }
      }
    });
  }, []);

  return null;
};

export default TrackRider;

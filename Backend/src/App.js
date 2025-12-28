import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Fake route
const route = [
  { lat: 18.5642, lng: 73.7769 },
  { lat: 18.5580, lng: 73.7900 },
  { lat: 18.5500, lng: 73.8100 },
  { lat: 18.5400, lng: 73.8300 },
  { lat: 18.5308, lng: 73.8475 },
];

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  let index = 0;          // ✅ PER SOCKET
  let interval = null;

  socket.on("startTracking", () => {
    // send route once
    socket.emit("routeData", {
      coordinates: route.map(p => [p.lng, p.lat]),
      duration: 900, // 15 min
    });

    interval = setInterval(() => {
      if (index >= route.length) {
        socket.emit("tripCompleted"); // ✅ MATCH FRONTEND
        clearInterval(interval);
        return;
      }

      socket.emit("driverLocation", {
        lat: route[index].lat,
        lng: route[index].lng,
        bearing: 45,
      });

      socket.emit("etaUpdate", Math.max(15 - index * 3, 2));
      index++;
    }, 3000);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    if (interval) clearInterval(interval);
  });
});

server.listen(5000, () => {
  console.log("Socket server running on 5000");
});

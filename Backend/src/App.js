// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

let riders = {};

// Rider sends live location
io.on("connection", (socket) => {
  socket.on("riderLocation", (data) => {
    // data = { orderId, lat, lng }
    riders[data.orderId] = data;
    io.emit("trackLocation", data);
  });
});

// Booking API
app.post("/api/book", (req, res) => {
  const { pickup, drop } = req.body;

  res.json({
    success: true,
    orderId: Date.now(),
    message: "Delivery booked",
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

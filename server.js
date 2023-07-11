const express = require("express");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute.jsx");
const bookingsRoute = require("./routes/bookingsRoute.jsx");

app.use("/api/rooms", roomsRoute); // api for all room related operations
app.use("/api/bookings", bookingsRoute); // api for all booking related operations

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started"));

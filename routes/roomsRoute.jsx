const express = require("express");
const router = express.Router();

const Room = require("../models/room.jsx");

router.get("/getrooms", async (req, res) => {
  try {
    // get all rooms
    const rooms = await Room.find({});

    // send all rooms
    res.send(rooms);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

module.exports = router;

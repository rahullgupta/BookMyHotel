const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currentbookings: [],
  },
  { timeStamps: true }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;

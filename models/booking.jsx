const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      correctTld: true,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Booked",
    },
  },
  { timeStamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;

const express = require("express");
const router = express.Router();
const Room = require("../models/room.jsx");

const Booking = require("../models/booking.jsx");
const moment = require("moment/moment.js");

const nodemailer = require("nodemailer");

// loads the environment variables
const dotenv = require("dotenv");

dotenv.config();

router.get("/viewbookings", async (req, res) => {
  try {
    // get all bookings
    const bookings = await Booking.find({});

    // send all bookings
    res.send(bookings);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/bookroom", async (req, res) => {
  const { myRoom, email, fromDate, toDate, amount } = req.body;
  try {
    // add the booking to the bookings table
    const booking = await Booking.insertMany({
      "id": "Room " + String(myRoom.roomNumber) + " - " + String(fromDate) + " to " + String(toDate),
      "roomNumber": myRoom.roomNumber,
      "roomType": myRoom.roomType,
      "email": email,
      "fromDate": moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      "toDate": moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
      "totalAmount": amount,
    });

    // add the booking to its respective room in the rooms table
    await Room.findOneAndUpdate(
      { "roomNumber": myRoom.roomNumber },
      {
        "$push": {
          "currentbookings": {
            "bookingId": booking[0].id,
            "fromDate": moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
            "toDate": moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
            "status": booking[0].status,
          },
        },
      }
    );

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "Room Booked", // Subject line
      text: "Your room has been Booked", // plain text body
      html: "<p>Booking for Room " + String(myRoom.roomNumber) + " - " + String(myRoom.roomType) + " has been made from " + String(moment(fromDate).format("DD-MM-YYYY HH:mm:ss")) + " to " + String(moment(toDate).format("DD-MM-YYYY HH:mm:ss")) + " </p>", // html body
    });

    res.send("Booked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/editbooking", async (req, res) => {
  const { myBooking, myRoom, email, fromDate, toDate, amount } = req.body;
  try {
    // find the booking to edit in the bookings table
    const bookingTemp = await Booking.find({ "id" : myBooking.id});

    // delete the old booking from its respective room in the rooms table
    await Room.findOneAndUpdate(
      { "roomNumber": bookingTemp[0].roomNumber },
      {
        "$pull": {
          "currentbookings": {
            "bookingId": bookingTemp[0].id,
          },
        },
      }
    );

    // add the new booking to its respective room in the bookings table
    await Room.findOneAndUpdate(
      { "roomNumber": myRoom.roomNumber },
      {
        "$push": {
          "currentbookings": {
            "bookingId": "Room " + String(myRoom.roomNumber) + " - " + String(fromDate) + " to " + String(toDate),
            "fromDate": moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
            "toDate": moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
            "status": "Booked",
          },
        },
      }
    );

    // edit the booking in the bookings table
    await Booking.findOneAndUpdate(
      { "id": bookingTemp[0].id },
      {
        "$set":{
          "id": "Room " + String(myRoom.roomNumber) + " - " + String(fromDate) + " to " + String(toDate),
          "roomNumber": myRoom.roomNumber,
          "roomType": myRoom.roomType,
          "email": email,
          "fromDate": fromDate,
          "toDate": toDate,
          "totalAmount": amount,
        }
      }
    );

    res.send("Edited successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deletebooking", async (req, res) => {
  const { myBooking } = req.body;
  try {
    // find the booking to delete in the bookings table
    const bookingTemp = await Booking.find({ "id" : myBooking.id});

    // delete the booking in the rooms table
    await Room.findOneAndUpdate(
      { "roomNumber": bookingTemp[0].roomNumber },
      {
        "$pull": {
          "currentbookings": {
            "bookingId": bookingTemp[0].id,
          },
        },
      }
    );

    // delete the booking in the bookings table
    await Booking.findOneAndDelete({ "id" : myBooking.id});

    res.send("Deleted successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import validator from "validator";

import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import moment from "moment";

const RangePickerProps = require("antd/es/date-picker");

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const hr = dayjs().hour();
const min = dayjs().minute();
const sec = dayjs().second();

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 24).splice(0, hr),
      disabledMinutes: () => range(0, 60).splice(0, min),
      disabledSeconds: () => range(0, 60).splice(0, sec),
    };
  }
  return {};
};
function Change() {
  const [myRoom, setMyRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [myBooking, setMyBooking] = useState();

  function setDates(dates) {
    // set from date
    setFromDate(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss"));
    // set to date
    setToDate(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"));
    // set amount
    setAmount(
      moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss")).diff(
        moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
        "hours"
      ) * myRoom.price
    );
  }

  function handleChange(event) {
    const room = rooms.find((room) => {
      return room.roomNumber === Number(event.target.value);
    });
    setMyRoom(room);
    setAmount(room.price);
  }

  function handleChange1(event) {
    setEmail(event.target.value);
  }

  function handleChange3(event) {
    const booking = bookings.find((booking) => {
      return booking.id === event.target.value;
    });
    setMyBooking(booking);
    const room = rooms.find((room) => {
      return room.roomNumber === booking.roomNumber;
    });
    setMyRoom(room);
    setAmount(room.price);
    setEmail(booking.email);
  }

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get("/api/rooms/getrooms")).data;
      const data2 = (await axios.get("/api/bookings/viewbookings")).data;
      setRooms(data);
      setBookings(data2);
    }
    fetchData();
  }, []);

  async function editBooking() {
    const details = {
      myBooking,
      myRoom,
      email,
      fromDate,
      toDate,
      amount,
    };
    try {
      await axios.post("/api/bookings/editbooking", details);
    } catch (err) {}
  }

  function changeData() {
    // check if all details were provided
    if (myRoom != null && fromDate !== "" && toDate !== "" && email !== "") {
      // chech if email is valid
      if (validator.isEmail(email)) {
        editBooking();
      } else {
        alert("Enter valid email!!!");
      }
    } else alert("Enter all details!!!");
  }

  return (
    <div className="container" style={{ width: "40%", marginTop: "40px" }}>
      <Form>
        <Form.Group className="mb-3" controlId="Room">
          <Form.Label>Booking ID</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange3}
          >
            <option value="">Choose Booking Id to Edit</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.id}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange1}
            defaultValue={myBooking != null ? myBooking.email : ""}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Room">
          <Form.Label>Room</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option value="">
              {myBooking != null
                ? String(myBooking.roomNumber) +
                  " - " +
                  String(myBooking.roomType)
                : "Room Number"}
            </option>
            {rooms.map(
              (room) =>
                (myBooking != null
                  ? myBooking.roomNumber !== room.roomNumber
                  : true) && (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    {room.roomNumber} - {room.roomType}
                  </option>
                )
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="my-3" controlId="Duration">
          <Form.Label>Duration</Form.Label>
          <div>
            <Space direction="vertical" size={12}>
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [
                    dayjs("00:00:00", "HH:mm:ss"),
                    dayjs("23:59:59", "HH:mm:ss"),
                  ],
                }}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={setDates}
                allowClear={false}
              />
            </Space>
          </div>
        </Form.Group>

        {myRoom && (
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Price(per hour): </Form.Label> {myRoom.price}
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="Amount">
          <Form.Label>Bill: </Form.Label> {amount}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={changeData}>
          Edit Booking
        </Button>
      </Form>
    </div>
  );
}

export default Change;

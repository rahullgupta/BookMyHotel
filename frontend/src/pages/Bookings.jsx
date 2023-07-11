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

function Bookings() {
  const [myRoom, setMyRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState(0);
  const [tempRooms, setTempRooms] = useState([]);

  function setDates(dates) {
    // set from date
    setFromDate(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss"));
    // set to date
    setToDate(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"));
    // set hours
    setHours(
      moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss")).diff(
        moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
        "hours"
      )
    );
    // get the rooms which are available in the duration between from date and to date
    var temp = [];
    for (const room of tempRooms) {
      var notAvailable = false;
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")).isBetween(
              booking.fromDate,
              booking.toDate
            ) ||
            moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss")).isBetween(
              booking.fromDate,
              booking.toDate
            ) ||
            moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss") ===
              booking.fromDate ||
            moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss") ===
              booking.toDate ||
            moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss") ===
              booking.fromDate ||
            moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss") ===
              booking.toDate ||
            moment(booking.fromDate).isBetween(
              moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
              moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"))
            ) ||
            moment(booking.toDate).isBetween(
              moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
              moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"))
            )
          ) {
            notAvailable = true;
            break;
          }
        }
      }
      if (!notAvailable || room.currentbookings.length === 0) temp.push(room);
    }
    setRooms(temp);
  }

  function handleChange(event) {
    const room = rooms.find((room) => {
      return room.roomNumber === Number(event.target.value);
    });
    setMyRoom(room);
    setAmount(hours * room.price);
  }

  function handleChange1(event) {
    setEmail(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get("/api/rooms/getrooms")).data;
      setRooms(data);
      setTempRooms(data);
    }
    fetchData();
  }, []);

  async function bookRoom() {
    const details = {
      myRoom,
      email,
      fromDate,
      toDate,
      amount,
    };
    try {
      await axios.post("/api/bookings/bookroom", details);
    } catch (err) {}
  }

  function sendData() {
    // check if all details are provided
    if (myRoom != null && fromDate !== "" && toDate !== "" && email !== "") {
      // check if email is valid
      if (validator.isEmail(email)) {
        bookRoom();
      } else {
        alert("Enter valid email!!!");
      }
    } else alert("Enter all details!!!");
  }

  return (
    <div className="container" style={{ width: "40%", marginTop: "40px" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange1}
          />
        </Form.Group>

        <Form.Group className="my-3">
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
                format="DD-MM-YYYY HH:mm:ss"
                onChange={setDates}
              />
            </Space>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Room</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option key={"Choose Room"} value="">
              Choose Room
            </option>
            {rooms.map((room) => (
              <option key={room.roomNumber} value={room.roomNumber}>
                {room.roomNumber} - {room.roomType}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {myRoom && (
          <Form.Group className="mb-3">
            <Form.Label>Price(per hour): </Form.Label> {myRoom.price}
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Bill: </Form.Label> {amount}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={sendData}>
          Book Room
        </Button>
      </Form>
    </div>
  );
}

export default Bookings;

import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import axios from "axios";
import Table from "react-bootstrap/Table";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

function Home() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tempBookings, setTempBookings] = useState([]);
  function filterByDate(dates) {
    var temp = [];
    // check if any booking lies between from date and to date(both inclusive)
    tempBookings.forEach((booking) => {
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
        moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss") === booking.toDate ||
        moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss") ===
          booking.fromDate ||
        moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss") === booking.toDate ||
        moment(booking.fromDate).isBetween(
          moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
          moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"))
        ) ||
        moment(booking.toDate).isBetween(
          moment(moment(dates[0].$d).format("YYYY-MM-DD HH:mm:ss")),
          moment(moment(dates[1].$d).format("YYYY-MM-DD HH:mm:ss"))
        )
      ) {
        temp.push(booking);
      }
    });
    setBookings(temp);
  }
  useEffect(() => {
    async function fetchData() {
      // get all bookings
      const data1 = (await axios.get("/api/bookings/viewbookings")).data;
      // get all rooms
      const data2 = (await axios.get("/api/rooms/getrooms")).data;
      setBookings(data1);
      setRooms(data2);
      setTempBookings(data1);
    }
    fetchData();
  }, []);

  function handleChange(event) {
    if(event.target.value === "")
      setBookings(tempBookings);
    else {
      // get all bookings of the room number
      const temp = [];
      tempBookings.forEach((booking) => {
        if (booking.roomNumber === Number(event.target.value)) temp.push(booking);
      });
      setBookings(temp);
    }
  }
  function handleChange1(event) {
    if(event.target.value === "")
      setBookings(tempBookings);
    else {
      // get all bookings of the room type
      const temp = [];
      tempBookings.forEach((booking) => {
        if (booking.roomType === event.target.value) temp.push(booking);
      });
      setBookings(temp);
    }
  }
  function handleChange2(event) {
    setBookings(tempBookings);
  }
  return (
    <div className="container" style={{ width: "50%" }}>
      <div className="row mt-5 mx-auto">
        <div className="col-md-3 mx-5">
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs("00:00:00", "HH:mm:ss"),
                  dayjs("23:59:59", "HH:mm:ss"),
                ],
              }}
              format="DD-MM-YYYY HH:mm:ss"
              onChange={filterByDate}
              allowClear={false}
            />
          </Space>
        </div>
        <div className="col-md-3">
          <select aria-label="Default select example" onChange={handleChange}>
            <option value="">Room Number</option>
            {rooms.map((room) => (
              <option key={room.roomNumber} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select aria-label="Default select example" onChange={handleChange1}>
            <option value="">Room Type</option>
            {[...new Set(rooms.map((room) => room.roomType))].map(
              (roomType) => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="row mt-5">
        <div>
          <button onClick={handleChange2}>Clear</button>
        </div>
      </div>
      <div className="row mt-5">
        {bookings.length === 0 && <p>No bookings yet</p>}
        {bookings.length > 0 && (
          <Table striped>
            <thead
              style={{
                backgroundColor: "#333",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <tr>
                <th colSpan={7}>All Bookings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Email</th>
                <th>From DateTime</th>
                <th>To DateTime</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.email}</td>
                  <td>
                    {moment(booking.fromDate).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                  <td>
                    {moment(booking.toDate).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                  <td>{booking.totalAmount}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Home;

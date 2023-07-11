import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Remove() {
  const [myBooking, setMyBooking] = useState();
  const [bookings, setBookings] = useState([]);
  const [hours, setHours] = useState(0);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    deleteBooking();
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  function handleChange(event) {
    // get the booking based on the id
    const booking = bookings.find((booking) => {
      return booking.id === event.target.value;
    });
    setMyBooking(booking);
    setHours(
      moment(moment(booking.fromDate).format("YYYY-MM-DD HH:mm:ss")).diff(
        moment(moment().format("YYYY-MM-DD HH:mm:ss")),
        "hours"
      )
    );
  }

  useEffect(() => {
    async function fetchData() {
      // get all bookings
      const data2 = (await axios.get("/api/bookings/viewbookings")).data;
      setBookings(data2);
    }
    fetchData();
  }, []);

  async function deleteBooking() {
    const details = {
      myBooking,
    };
    try {
      await axios.post("/api/bookings/deletebooking", details);
    } catch (err) {}
  }

  async function deleteData() {
    if (myBooking != null) {
      // set refund
      if (hours > 48) {
        let refund = myBooking.totalAmount;
        setMessage(
          "As per the cancellation policy, 100% of " +
            String(myBooking.totalAmount) +
            " i.e. " +
            String(refund) +
            " will be refunded."
        );
      } else if (hours >= 24 && hours <= 48) {
        let refund = myBooking.totalAmount / 2;
        setMessage(
          "As per the cancellation policy, 50% of " +
            String(myBooking.totalAmount) +
            " i.e. " +
            String(refund) +
            " will be refunded."
        );
      } else {
        setMessage(
          "As per the cancellation policy, 0% of " +
            String(myBooking.totalAmount) +
            " i.e. 0 will be refunded."
        );
      }
      handleShow();
    } else alert("Select a Booking ID to delete!!!");
  }

  return (
    <div className="container" style={{ width: "40%", marginTop: "40px" }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group className="mb-3" controlId="Room">
          <Form.Label>Booking ID</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option value="">Choose Booking ID to Delete</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.id}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={deleteData}>
          Delete Booking
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </div>
  );
}

export default Remove;

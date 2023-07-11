import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path d="M12.691406 0L11.564453 2.3320312L9 2.6386719L10.949219 4.3613281L10.435547 7L12.691406 5.6816406L14.949219 7L14.435547 4.3613281L16.384766 2.6386719L13.820312 2.3320312L12.691406 0 z M 14.949219 7L10.435547 7L9.3007812 7C6.3730036 7 4 9.3730039 4 12.300781L4 45 A 1.0001 1.0001 0 0 0 5 46L45 46 A 1.0001 1.0001 0 0 0 46 45L46 12.300781C46 9.3730039 43.626997 7 40.699219 7L39.564453 7L35.050781 7L31.359375 7L26.845703 7L23.154297 7L18.640625 7L14.949219 7 z M 18.640625 7L20.896484 5.6816406L23.154297 7L22.640625 4.3613281L24.589844 2.6386719L22.025391 2.3320312L20.896484 0L19.769531 2.3320312L17.205078 2.6386719L19.154297 4.3613281L18.640625 7 z M 26.845703 7L29.103516 5.6816406L31.359375 7L30.845703 4.3613281L32.794922 2.6386719L30.230469 2.3320312L29.103516 0L27.974609 2.3320312L25.410156 2.6386719L27.359375 4.3613281L26.845703 7 z M 35.050781 7L37.308594 5.6816406L39.564453 7L39.050781 4.3613281L41 2.6386719L38.435547 2.3320312L37.308594 0L36.179688 2.3320312L33.615234 2.6386719L35.564453 4.3613281L35.050781 7 z M 9.3007812 9L40.699219 9C42.571441 9 44 10.428559 44 12.300781L44 44L29 44L29 36 A 1.0001 1.0001 0 0 0 28 35L22 35 A 1.0001 1.0001 0 0 0 21 36L21 44L6 44L6 12.300781C6 10.428559 7.4285592 9 9.3007812 9 z M 10 11 A 1.0001 1.0001 0 0 0 9 12L9 16 A 1.0001 1.0001 0 0 0 10 17L16 17 A 1.0001 1.0001 0 0 0 17 16L17 12 A 1.0001 1.0001 0 0 0 16 11L10 11 z M 22 11 A 1.0001 1.0001 0 0 0 21 12L21 16 A 1.0001 1.0001 0 0 0 22 17L28 17 A 1.0001 1.0001 0 0 0 29 16L29 12 A 1.0001 1.0001 0 0 0 28 11L22 11 z M 34 11 A 1.0001 1.0001 0 0 0 33 12L33 16 A 1.0001 1.0001 0 0 0 34 17L40 17 A 1.0001 1.0001 0 0 0 41 16L41 12 A 1.0001 1.0001 0 0 0 40 11L34 11 z M 11 13L15 13L15 15L11 15L11 13 z M 23 13L27 13L27 15L23 15L23 13 z M 35 13L39 13L39 15L35 15L35 13 z M 10 19 A 1.0001 1.0001 0 0 0 9 20L9 24 A 1.0001 1.0001 0 0 0 10 25L16 25 A 1.0001 1.0001 0 0 0 17 24L17 20 A 1.0001 1.0001 0 0 0 16 19L10 19 z M 22 19 A 1.0001 1.0001 0 0 0 21 20L21 24 A 1.0001 1.0001 0 0 0 22 25L28 25 A 1.0001 1.0001 0 0 0 29 24L29 20 A 1.0001 1.0001 0 0 0 28 19L22 19 z M 34 19 A 1.0001 1.0001 0 0 0 33 20L33 24 A 1.0001 1.0001 0 0 0 34 25L40 25 A 1.0001 1.0001 0 0 0 41 24L41 20 A 1.0001 1.0001 0 0 0 40 19L34 19 z M 11 21L15 21L15 23L11 23L11 21 z M 23 21L27 21L27 23L23 23L23 21 z M 35 21L39 21L39 23L35 23L35 21 z M 10 27 A 1.0001 1.0001 0 0 0 9 28L9 32 A 1.0001 1.0001 0 0 0 10 33L16 33 A 1.0001 1.0001 0 0 0 17 32L17 28 A 1.0001 1.0001 0 0 0 16 27L10 27 z M 22 27 A 1.0001 1.0001 0 0 0 21 28L21 32 A 1.0001 1.0001 0 0 0 22 33L28 33 A 1.0001 1.0001 0 0 0 29 32L29 28 A 1.0001 1.0001 0 0 0 28 27L22 27 z M 34 27 A 1.0001 1.0001 0 0 0 33 28L33 32 A 1.0001 1.0001 0 0 0 34 33L40 33 A 1.0001 1.0001 0 0 0 41 32L41 28 A 1.0001 1.0001 0 0 0 40 27L34 27 z M 11 29L15 29L15 31L11 31L11 29 z M 23 29L27 29L27 31L23 31L23 29 z M 35 29L39 29L39 31L35 31L35 29 z M 10 35 A 1.0001 1.0001 0 0 0 9 36L9 40 A 1.0001 1.0001 0 0 0 10 41L16 41 A 1.0001 1.0001 0 0 0 17 40L17 36 A 1.0001 1.0001 0 0 0 16 35L10 35 z M 34 35 A 1.0001 1.0001 0 0 0 33 36L33 40 A 1.0001 1.0001 0 0 0 34 41L40 41 A 1.0001 1.0001 0 0 0 41 40L41 36 A 1.0001 1.0001 0 0 0 40 35L34 35 z M 11 37L15 37L15 39L11 39L11 37 z M 23 37L27 37L27 44L23 44L23 37 z M 35 37L39 37L39 39L35 39L35 37 z" />
          </svg>
          <span className="fs-4 mx-3">BookMyHotel</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="nav-link">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                    color: "black",
                  };
                }}
              >
                Home
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to={"/addbooking"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                    color: "black",
                  };
                }}
              >
                Add Booking
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to={"/editbooking"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                    color: "black",
                  };
                }}
              >
                Edit Booking
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to={"/deletebooking"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                    color: "black",
                  };
                }}
              >
                Delete Booking
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to={"/viewbooking"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                    color: "black",
                  };
                }}
              >
                View Booking
              </NavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

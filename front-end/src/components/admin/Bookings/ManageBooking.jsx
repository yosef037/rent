import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../Navbar/AdminNav";
import "./ManageBooking.css";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setErrorMessage("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, []);

  // Function to confirm booking
  const confirmBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5000/bookings/${bookingId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.Booking_Id === bookingId ? { ...b, Status: "confirmed" } : b
        )
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
      setErrorMessage("Failed to confirm booking.");
    }
  };
  const cancleBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5000/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.Booking_Id === bookingId ? { ...b, Status: "confirmed" } : b
        )
      );
    } catch (error) {
      console.error("Error Canceling booking:", error);
      setErrorMessage("Failed to Cancel booking.");
    }
  };

  // Function to reject booking
  const rejectBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b.Booking_Id !== bookingId));
    } catch (error) {
      console.error("Error rejecting booking:", error);
      setErrorMessage("Failed to reject booking.");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="manage-booking mt-4">
        <h1>Manage Bookings</h1>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <h2>Bookings</h2>
        <table className="">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Number</th>
              <th>Vehicle ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Message</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.Booking_Id}>
                <td>{booking.Booking_Id}</td>
                <td>{booking.Booking_Number}</td>
                <td>{booking.Vehicle_Id}</td>
                <td>{booking.Email}</td>
                <td>{booking.Status}</td>
                <td>{booking.Message}</td>
                <td>{new Date(booking.Start_Date).toLocaleDateString()}</td>
                <td>{new Date(booking.End_Date).toLocaleDateString()}</td>
                <td>
                  {booking.Status === "pending" && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => confirmBooking(booking.Booking_Id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => cancleBooking(booking.Booking_Id)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => rejectBooking(booking.Booking_Id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageBooking;

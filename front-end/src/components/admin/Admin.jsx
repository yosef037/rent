import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bookings?status=pending",
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

  const handleApprove = async (bookingId) => {
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
      // Refresh bookings after approval
      setBookings(
        bookings.filter((booking) => booking.Booking_Id !== bookingId)
      );
    } catch (error) {
      console.error("Error approving booking:", error);
      setErrorMessage("Failed to approve booking.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pending Bookings</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking Number</th>
              <th>Vehicle ID</th>
              <th>Email</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.Booking_Id}>
                <td>{booking.Booking_Number}</td>
                <td>{booking.Vehicle_Id}</td>
                <td>{booking.Email}</td>
                <td>{new Date(booking.Start_Date).toLocaleDateString()}</td>
                <td>{new Date(booking.End_Date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleApprove(booking.Booking_Id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../pages/UserLogin/Authmodel";
import "./MyBooking.css"; // Import CSS file for styling

const ViewBookings = ({ setShowLogin }) => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth(); // Get user data from Auth context

  useEffect(() => {
    if (!user) return; // If user is not logged in, don't fetch bookings

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bookings?email=${user.Email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Response from server:", response.data); // Log the server response

        setBookings(response.data); // Set bookings data from response
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setErrorMessage("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [user]);

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  const rejectedBookings = bookings.filter(
    (booking) => booking.Status === "canceled"
  );

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking Number</th>
              <th>Vehicle ID</th>
              <th>Email</th>
              <th>Images</th> {/* Add Images column */}
              <th>Start Date</th>
              <th>End Date</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.Booking_Id}>
                <td>{booking.Booking_Number}</td> {/* Display Booking Number */}
                <td>{booking.Vehicle_Id}</td>
                <td>{booking.Email}</td>
                <td>
                  {/* Display all vehicle images */}
                  {booking.Image_1 && (
                    <img
                      src={`http://localhost:5000${booking.Image_1}`}
                      alt="Vehicle"
                      style={{
                        width: "100px",
                        height: "auto",
                        marginRight: "5px",
                      }}
                    />
                  )}
                </td>{" "}
                {/* Display Images */}
                <td>{new Date(booking.Start_Date).toLocaleDateString()}</td>
                <td>{new Date(booking.End_Date).toLocaleDateString()}</td>
                <td>{booking.Message}</td>
                <td>{booking.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Rejected Bookings Section */}
      <section className="mt-4">
        <h2>Rejected Bookings</h2>
        {rejectedBookings.length === 0 ? (
          <p>No rejected bookings found.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking Number</th>
                <th>Vehicle ID</th>
                <th>Email</th>
                <th>Images</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedBookings.map((booking) => (
                <tr key={booking.Booking_Id}>
                  <td>{booking.Booking_Number}</td>
                  <td>{booking.Vehicle_Id}</td>
                  <td>{booking.Email}</td>
                  <td>
                    {booking.Image_1 && (
                      <img
                        src={`http://localhost:5000${booking.Image_1}`}
                        alt="Vehicle"
                        style={{
                          width: "100px",
                          height: "auto",
                          marginRight: "5px",
                        }}
                      />
                    )}
                  </td>
                  <td>{new Date(booking.Start_Date).toLocaleDateString()}</td>
                  <td>{new Date(booking.End_Date).toLocaleDateString()}</td>
                  <td>{booking.Message}</td>
                  <td>{booking.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ViewBookings;

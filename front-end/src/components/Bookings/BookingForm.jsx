import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const location = useLocation();
  const { userEmail } = location.state || {}; // Retrieve user email from state
  console.log(`User Email ${userEmail}`);
  const vehicleId = location.pathname.split("/").pop(); // Get vehicle ID from URL
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState({
    Vehicle_Id: vehicleId,
    Email: userEmail, // Set email automatically if needed
    Start_Date: "",
    End_Date: "",
    Message: "",
    Status: "pending", // Default status
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dates
    if (
      new Date(bookingDetails.End_Date) <= new Date(bookingDetails.Start_Date)
    ) {
      setErrorMessage("End date must be after start date.");
      return;
    }

    // Make POST request to book the vehicle
    axios
      .post("http://localhost:5000/bookings", bookingDetails)
      .then((response) => {
        alert("Booking successful!");
        navigate("/view-bookings")
        console.log(response.data);
        // Reset form or handle further actions as needed
        setBookingDetails({
          Vehicle_Id: vehicleId,
          Email: userEmail,
          Start_Date: "",
          End_Date: "",
          Message: "",
          Status: "pending",
        });
      })
      .catch((error) => {
        console.error("Error during booking:", error);
        setErrorMessage(error.response?.data?.error || "Booking failed!");
      });
  };

  return (
    <div className="container mt-4 booking-form">
      <h2 className="text-center">Book a Vehicle</h2>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Start Date Field */}
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={bookingDetails.Start_Date}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                Start_Date: e.target.value,
              })
            }
            required
          />
        </div>

        {/* End Date Field */}
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={bookingDetails.End_Date}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, End_Date: e.target.value })
            }
            required
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={bookingDetails.Message}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, Message: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

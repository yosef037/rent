import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../UserLogin/Authmodel"; // Import user context
import "./VehicleDetail.css"; // Import your CSS file
import { Link } from "react-router-dom";
import axiosInstance from "../../components/admin/Axios";

const VehicleDetail = ({ setShowLogin }) => {
  const { id } = useParams(); // Get vehicle ID from URL parameters
  const [vehicle, setVehicle] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth(); // Get user data from Auth context
  const [bookingData, setBookingData] = useState({
    Email: user?.Email || "", // Automatically set email from user context
    Start_Date: "",
    End_Date: "",
    Message: "",
  });
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:5000/vehicles/${id}`
        );
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setErrorMessage("Failed to load vehicle details.");
      }
    };

    fetchVehicleDetails();
  }, [id]);

  // Handle booking form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("http://localhost:5000/bookings", {
        Vehicle_Id: id,
        ...bookingData,
      });
      alert("Booking successful!");
      navigate("/view-bookings"); // Redirect to bookings page
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking.");
    }
  };

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  if (!vehicle) {
    return <p>Loading vehicle details...</p>;
  }

  return (
    <div className="container mt-4 vehicle-detail">
      <h1>{`${vehicle.Make} ${vehicle.Model}`}</h1>
      {/* Display all images */}
      <div className="image-gallery">
        {[1, 2, 3, 4, 5].map((index) =>
          vehicle[`Image_${index}`] ? (
            <img
              key={index}
              src={`http://localhost:5000${vehicle[`Image_${index}`]}`}
              alt={`${vehicle.Make} ${vehicle.Model} Image ${index}`}
              className="img-fluid"
            />
          ) : null
        )}
      </div>

      {/* Additional vehicle details */}
      <div className="d-flex m-5 gap-5">
        <div className="details w-25">
          <h3>Description</h3>
          <p>{vehicle.Vehicle_Description}</p>
          <h3>Details</h3>
          <ul>
            <li>
              <strong>Year:</strong> {vehicle.Year}
            </li>
            <li>
              <strong>Color:</strong> {vehicle.Color}
            </li>
            <li>
              <strong>Fuel Type:</strong> {vehicle.Fuel_Type}
            </li>
            <li>
              <strong>Seating Capacity:</strong> {vehicle.Seating_Capacity}
            </li>
            <li>
              <strong>Status:</strong> {vehicle.Status}
            </li>
            <li>
              <strong>Price per Day:</strong> ${vehicle.Price_Per_Day}
            </li>
          </ul>
        </div>
        <div className="booking w-25 ">
          {/* Booking Form */}
          <h3>Book This Vehicle</h3>
          <form onSubmit={handleBookingSubmit} className="booking-form  ">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="Start_Date"
                className="form-control"
                value={bookingData.Start_Date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="End_Date"
                className="form-control"
                value={bookingData.End_Date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="Message"
                className="form-control"
                value={bookingData.Message}
                onChange={handleInputChange}
              />
            </div>
            {user ? (
              <Link
                to={`/vehicles/${vehicle.Vehicle_Id}`}
                state={{ userEmail: user.Email }} // Pass user email via state
              >
                <button className="btn-details" onClick={handleBookingSubmit}>
                  Book This Vehicle
                </button>
              </Link>
            ) : (
              <button
                className="btn-details"
                onClick={() => {
                  alert("Please log in to book.");
                  setShowLogin(true);
                }}
              >
                Login to Book
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;

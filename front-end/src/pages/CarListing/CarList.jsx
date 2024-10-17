import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import "./CarListing.css"; // Import your CSS file
import { useAuth } from "../UserLogin/Authmodel";

const CarListing = ({ setShowLogin }) => {
  const [vehicles, setVehicles] = useState([]);
  const [auth, setAuth] = useState(false);
  const { user } = useAuth(); // Get user data from Auth context

  axios.defaults.withCredentials = true;

  // Check authentication status
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch vehicles data
  useEffect(() => {
    axios
      .get("http://localhost:5000/vehicles")
      .then((response) => {
        setVehicles(response.data); // Store the data
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  if (!vehicles || vehicles.length === 0) {
    return <p>Loading vehicles...</p>; // Ensure vehicles have loaded
  }

  return (
    <div className="container mt-4">
      <h1>Available Vehicles</h1>
      <div className="row">
        {vehicles.map((vehicle) => (
          <div key={vehicle.Vehicle_Id} className="col-md-4 mb-4">
            <div className="card vehicle-card">
              {/* Display only one image */}
              {vehicle.Image_1 && (
                <Link to={`/vehicles/${vehicle.Vehicle_Id}`}>
                  <img
                    src={`http://localhost:5000${vehicle.Image_1}`}
                    alt={`${vehicle.Make} ${vehicle.Model}`}
                    className="card-img-top"
                  />
                </Link>
              )}
              <div className="card-body">
                <h5 className="card-title">{`${vehicle.Make} ${vehicle.Model} (${vehicle.Year})`}</h5>
                <p className="card-text">
                  <strong>Description:</strong> {vehicle.Vehicle_Description}
                </p>
                <p className="card-text">
                  <strong>Fuel Type:</strong> {vehicle.Fuel_Type}
                </p>
                <p className="card-text">
                  <strong>Seating Capacity:</strong> {vehicle.Seating_Capacity}
                </p>
                <p className="card-text">
                  <strong>Status:</strong> {vehicle.Status}
                </p>
                <p className="card-text">
                  <strong>Price per Day:</strong> K{vehicle.Price_Per_Day}
                </p>
                {user ? ( // Check if user is logged in
                  <Link
                    // to={`/booking/${vehicle.Vehicle_Id}`}
                    to={`/vehicles/${vehicle.Vehicle_Id}`}
                    state={{ userEmail: user.Email }} // Pass user email via state
                    className="btn btn-primary"
                  >
                    Book This Vehicle
                  </Link>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowLogin(true)} // Show login modal
                  >
                    Login to Book
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Link */}
      {user &&
        user.role === "admin" && ( // Only show for admin users
          <Link to="/admin/add-vehicle" className="btn btn-success mt-3">
            Add Vehicle
          </Link>
        )}
    </div>
  );
};

export default CarListing;

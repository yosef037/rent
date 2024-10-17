import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { vehicles } = location.state || {}; // Get vehicles from state

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Search Results</h2>
      <div className="row">
        {vehicles.map((vehicle) => (
          <div key={vehicle.Vehicle_Id} className="col-md-4 mb-4">
            <div className="card">
              {/* Display one image */}
              {vehicle.Image_1 && (
                <img
                  src={`http://localhost:5000${vehicle.Image_1}`}
                  alt={`${vehicle.Make} ${vehicle.Model}`}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{`${vehicle.Make} ${vehicle.Model}`}</h5>
                <p className="card-text">
                  <strong>Price per Day:</strong> ${vehicle.Price_Per_Day}
                </p>
                {/* Add more vehicle details as needed */}
                <Link
                  to={`/vehicles/${vehicle.Vehicle_Id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

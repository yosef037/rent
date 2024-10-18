import React, { useEffect, useState } from "react";
import axiosInstance from "../admin/Axios";
const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setErrorMessage("Failed to load locations.");
      }
    };

    fetchLocations();
  }, []);

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  return (
    <div>
      <ol>
        {locations.map((location) => (
          <li key={location.Location_Id}>
            {location.Location_Name}, {location.City}, {location.Country}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LocationsList;

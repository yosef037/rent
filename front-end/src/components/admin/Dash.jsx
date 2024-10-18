import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dash.css"; // Ensure you have the correct path to your CSS
import axiosInstance from "./Axios";

const TaskPanels = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [bookingsRes, vehiclesRes, usersRes, locationsRes] =
          await Promise.all([
            axiosInstance.get("/admin/bookings/count"),
            axiosInstance.get("/admin/vehicles/count"),
            axiosInstance.get("/admin/users/count"),
            axiosInstance.get("/admin/locations/count"),
          ]);

        // Log the counts received from the API
        console.log("Bookings Count:", bookingsRes.data.count);
        console.log("Vehicles Count:", vehiclesRes.data.count);
        console.log("Users Count:", usersRes.data.count);
        console.log("Locations Count:", locationsRes.data.count);

        setBookingCount(bookingsRes.data.count);
        setVehicleCount(vehiclesRes.data.count);
        setUserCount(usersRes.data.count);
        setLocationCount(locationsRes.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error); // Log any errors that occur during the fetch
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="task-panels">
      <Link to="/admin/manage-bookings" className="task-panel">
        <h3>View Bookings</h3>
        <p>Check all bookings made by users.</p>
        <span className="count">{bookingCount}</span>{" "}
        {/* Display booking count */}
      </Link>
      <Link to="/admin/manage-vehicles" className="task-panel">
        <h3>Manage Vehicles</h3>
        <p>Add, edit, or remove vehicles from the inventory.</p>
        <span className="count">{vehicleCount}</span>{" "}
        {/* Display vehicle count */}
      </Link>
      <Link to="/admin/manage-users" className="task-panel">
        <h3>Manage Users</h3>
        <p>View and manage user accounts.</p>
        <span className="count">{userCount}</span> {/* Display user count */}
      </Link>
      <Link to="/admin/locations" className="task-panel">
        <h3>Manage Locations</h3>
        <p>Update rental locations across Zambia.</p>
        <span className="count">{locationCount}</span>{" "}
        {/* Display location count */}
      </Link>
    </div>
  );
};

export default TaskPanels;

import React from "react";
import "./Dashboard.css"; // Import CSS for styling
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your vehicle rentals efficiently.</p>
      </header>

      <div className="dashboard-content">
        <div className="task-panels">
          <Link to="/admin/manage-bookings" className="task-panel">
            <h3>View Bookings</h3>
            <p>Check all bookings made by users.</p>
          </Link>
          <Link to="/admin/manage-vehicles" className="task-panel">
            <h3>Manage Vehicles</h3>
            <p>Add, edit, or remove vehicles from the inventory.</p>
          </Link>
          <Link to="/users" className="task-panel">
            <h3>Manage Users</h3>
            <p>View and manage user accounts.</p>
          </Link>
          <Link to="/locations" className="task-panel">
            <h3>Manage Locations</h3>
            <p>Update rental locations across Zambia.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch bookings
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
        console.log(`Booking: ${response.data}`);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setErrorMessage("Failed to load bookings.");
      }
    };

    // Fetch users

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("Failed to load users.");
      }
    };

    // Fetch vehicles
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/vehicles",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setErrorMessage("Failed to load vehicles.");
      }
    };

    fetchBookings();
    fetchUsers();
    fetchVehicles();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Admin Dashboard</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <h2>Bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Booking Number</th>
            <th>Vehicle ID</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.Booking_Id}>
              <td>{booking.Booking_Number}</td>
              <td>{booking.Vehicle_Id}</td>
              <td>{booking.Email}</td>
              <td>{booking.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.User_Id}>
              <td>{user.User_Id}</td>
              <td>
                {user.First_name} {user.Last_name}
              </td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Available Vehicles</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.Vehicle_Id}>
              <td>{vehicle.Vehicle_Id}</td>
              <td>{vehicle.Make}</td>
              <td>{vehicle.Model}</td>
              <td>{vehicle.Year}</td>
              <td>{vehicle.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

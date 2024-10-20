import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import AdminDash from "../DashBoard/AdminDash";
import { useAuth } from "../../../pages/UserLogin/Authmodel";
import AdminNav from "../Navbar/AdminNav";
import "./ManageVehicles.css";
import axiosInstance from "../Axios";

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    Make: "",
    Model: "",
    Year: "",
    Color: "",
    License_Plate: "",
    Vehicle_Description: "",
    Fuel_Type: "Petrol",
    Seating_Capacity: 1,
    Price_Per_Day: 0,
    Vehicle_Id: null, // For editing
  });

  const [images, setImages] = useState(Array(5).fill(null)); // For image uploads
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const { user, logout } = useAuth(); // Get user and logout function from Auth context
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home or login page after logout
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Fetch vehicles from the backend
  const fetchVehicles = async () => {
    try {
      const response = await axiosInstance.get(
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads
  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0]; // Store the file object
    setImages(newImages);
  };

  // Handle form submission for adding or editing a vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSubmit.append(key, formData[key])
      );
      images.forEach((image) => {
        if (image) formDataToSubmit.append("images", image);
      });

      if (formData.Vehicle_Id) {
        await axiosInstance.put(
          `http://localhost:5000/vehicles/${formData.Vehicle_Id}`,
          formDataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Vehicle updated successfully!");
      } else {
        await axiosInstance.post(
          "http://localhost:5000/vehicles/add",
          formDataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Vehicle added successfully!");
      }
      fetchVehicles(); // Refresh the vehicle list after add/edit
      resetForm(); // Reset form after submission
    } catch (error) {
      console.error("Error saving vehicle:", error);
      setErrorMessage("Failed to save vehicle.");
    }
  };

  // Function to delete a vehicle
  const deleteVehicle = async (vehicleId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:5000/vehicles/${vehicleId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchVehicles(); // Refresh the vehicle list after deletion
      alert("Vehicle deleted successfully!");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      setErrorMessage("Failed to delete vehicle.");
    }
  };

  // Function to reset the form for adding a new vehicle
  const resetForm = () => {
    setFormData({
      Make: "",
      Model: "",
      Year: "",
      Color: "",
      License_Plate: "",
      Vehicle_Description: "",
      Fuel_Type: "Petrol",
      Seating_Capacity: 1,
      Price_Per_Day: 0,
      Vehicle_Id: null,
    });
    setImages(Array(5).fill(null)); // Reset images
  };

  return (
    <>
      <AdminNav />
      <div className="manage-vehicles mt-4">
        {/* Vehicles List */}
        <h1>Existing Vehicles</h1>
        {vehicles.length > 0 ? (
          <table className=" mt-3">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.Vehicle_Id}>
                  <td>{vehicle.Vehicle_Id}</td>
                  <td>{vehicle.Make}</td>
                  <td>{vehicle.Model}</td>
                  <td>{vehicle.Year}</td>
                  {/* Add other relevant data */}
                  {/* Edit and Delete buttons */}
                  <td>{vehicle.Status}</td>

                  {/* Edit button */}
                  <td>
                    <button
                      className="btn btn-warning "
                      onClick={() => setFormData(vehicle)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger "
                      onClick={() => deleteVehicle(vehicle.Vehicle_Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>No vehicles available.</>
        )}
        <h1>Manage Vehicles</h1>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="row gap-3">
          <h2>{formData.Vehicle_Id ? "Edit Vehicle" : "Add Vehicle"}</h2>
          <div className=" col-md-5">
            <label>Make</label>
            <input
              type="text"
              name="Make"
              className="form-control"
              value={formData.Make}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-5">
            <label>Model</label>
            <input
              type="text"
              name="Model"
              className="form-control"
              value={formData.Model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Year</label>
            <input
              type="number"
              name="Year"
              className="form-control"
              value={formData.Year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Color</label>
            <input
              type="text"
              name="Color"
              className="form-control"
              value={formData.Color}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label>License Plate</label>
            <input
              type="text"
              name="License_Plate"
              className="form-control"
              value={formData.License_Plate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-5">
            <label>Vehicle Description</label>
            <textarea
              name="Vehicle_Description"
              className="form-control"
              value={formData.Vehicle_Description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <label>Fuel Type</label>
            <select
              name="Fuel_Type"
              className="form-control"
              value={formData.Fuel_Type}
              onChange={handleChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="col-md-2">
            <label>Seating Capacity</label>
            <input
              type="number"
              min="1"
              name="Seating_Capacity"
              className="form-control"
              value={formData.Seating_Capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <label>Price per Day (K)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="Price_Per_Day"
              className="form-control"
              value={formData.Price_Per_Day}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Uploads */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="col-md-3">
              <label>{`Image ${index + 1}`}</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(index, e)}
                required={!images[index]} // Make it required if no image is uploaded yet
              />
            </div>
          ))}
        </form>
        <button
          onClick={handleSubmit}
          className="btn btn-danger w-25 d-grid m-auto gap-2 mt-2"
        >
          {formData.Vehicle_Id ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </div>
    </>
  );
};

export default ManageVehicle;

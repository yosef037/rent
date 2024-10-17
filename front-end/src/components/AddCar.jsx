import React, { useState } from "react";
import axios from "axios"; // Adjust the import based on your axios setup
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const AddVehicle = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [seatingCapacity, setSeatingCapacity] = useState(1);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [images, setImages] = useState(Array(5).fill(null)); // For 5 image files
  const navigate = useNavigate(); // Initialize navigate

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0]; // Store the file object
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("Make", make);
    formData.append("Model", model);
    formData.append("Year", year);
    formData.append("Color", color);
    formData.append("License_Plate", licensePlate);
    formData.append("Vehicle_Description", vehicleDescription);
    formData.append("Fuel_Type", fuelType);
    formData.append("Seating_Capacity", seatingCapacity);
    formData.append("Price_Per_Day", pricePerDay);

    // Append image files to FormData
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image); // Use 'images' as the field name here
      }
    });

    axios
      .post("http://localhost:5000/vehicles/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Vehicle added successfully");
        console.log("Vehicle added successfully:", response.data);
        navigate("/"); // Redirect to the home page or vehicle listing
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Make</label>
          <input
            type="text"
            className="form-control"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>License Plate</label>
          <input
            type="text"
            className="form-control"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Description</label>
          <textarea
            className="form-control"
            value={vehicleDescription}
            onChange={(e) => setVehicleDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fuel Type</label>
          <select
            className="form-control"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="form-group">
          <label>Seating Capacity</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price per Day (K)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
          />
        </div>

        {/* Image Uploads */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="form-group">
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

        <button type="submit" className="btn btn-primary">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;

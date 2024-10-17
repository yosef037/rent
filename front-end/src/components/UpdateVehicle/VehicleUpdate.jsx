// src/components/VehicleUpdateForm.js
import React, { useState } from 'react';
import axios from 'axios';

const VehicleUpdateForm = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleDetails, setVehicleDetails] = useState({
        Make: '',
        Model: '',
        Year: '',
        Color: '',
        License_Plate: "",
        Status: false
    });

    // const [formData, setFormData] = useState({
    //     license_plate: vehicle?.license_plate || "",
    //     make: vehicle?.make || "",
    //     model: vehicle?.model || "",
    //     year: vehicle?.year || "",
    //     color: vehicle?.color || "",
    //     owner_id: vehicle?.owner_id || "available",
    //   });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       if (vehicle) {
    //         await axios.put('/vehicles/:id', formData);
    //       } else {
    //         await axios.post("/vehicles", formData);
    //       }
    //       onFormSubmit(); //Refresh the list after adding/updating a vehicle
    //     } catch (error) {
    //       console.error("Error Submitting Form:", error);
    //     }
    //   };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleDetails({
            ...vehicleDetails,
            [name]: value
        });
    };

    // Handle checkbox change for availability
    const handleCheckboxChange = (e) => {
        setVehicleDetails({
            ...vehicleDetails,
            Status: e.target.checked
        });
    };

    // Submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!vehicleId) {
            alert("Please enter the vehicle ID to update.");
            return;
        }

        // Make the PUT request to update vehicle
        axios.put(`http://localhost:5000/vehicles/${vehicleId}`, vehicleDetails)
            .then(response => {
                console.log(response.data);
                alert("Vehicle updated successfully!");
            })
            .catch(error => {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error("Error response:", error.response.data);
                } else if (error.request) {
                    // Request was made, but no response was received
                    console.error("Error request:", error.request);
                } else {
                    // Something else triggered the error
                    console.error("Error message:", error.message);
                }
                alert("Error updating the vehicle. Please try again.");
            });
            
    };

    return (
        <div>
            <h2>Update Vehicle Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vehicle ID (to update): </label>
                    <input 
                        type="text" 
                        name="vehicleId" 
                        value={vehicleId} 
                        onChange={(e) => setVehicleId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Make: </label>
                    <input 
                        type="text" 
                        name="Make" 
                        value={vehicleDetails.Make} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Model: </label>
                    <input 
                        type="text" 
                        name="Model" 
                        value={vehicleDetails.Model} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Year: </label>
                    <input 
                        type="number" 
                        name="Year" 
                        value={vehicleDetails.Year} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Color: </label>
                    <input 
                        type="text" 
                        name="Color" 
                        value={vehicleDetails.Color} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>License Plate: </label>
                    <input 
                        type="text" 
                        name="License_Plate" 
                        value={vehicleDetails.License_Plate} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Status: </label>
                    <input 
                        type="checkbox" 
                        name="Status" 
                        checked={vehicleDetails.Status} 
                        onChange={handleCheckboxChange} 
                    />
                </div>
                <button type="submit">Update Vehicle</button>
            </form>
        </div>
    );
};

export default VehicleUpdateForm;

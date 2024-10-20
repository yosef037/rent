import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios"; // Import your configured axios instance
import "./ManageLocations.css"; // Import CSS for styling
import AdminNav from "../Navbar/AdminNav";

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingLocation, setEditingLocation] = useState(null); // State for editing location

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("/admin/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setErrorMessage("Failed to load locations.");
      }
    };

    fetchLocations();
  }, []);

  const handleDeleteLocation = async (locationId) => {
    try {
      await axiosInstance.delete(`/admin/locations/${locationId}`);
      setLocations(
        locations.filter((location) => location.Location_Id !== locationId)
      );
      alert("Location deleted successfully!");
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location.");
    }
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location); // Set the location to be edited
  };

  const handleUpdateLocation = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.put(
        `/admin/locations/${editingLocation.Location_Id}`,
        editingLocation
      );
      setLocations(
        locations.map((location) =>
          location.Location_Id === editingLocation.Location_Id
            ? editingLocation
            : location
        )
      );
      alert("Location updated successfully!");
      setEditingLocation(null); // Reset editing state
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Failed to update location.");
    }
  };

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  return (
    <>
      <AdminNav />
      <div className="manage-locations s">
        <h3>Manage Locations</h3>

        {editingLocation ? (
          <form onSubmit={handleUpdateLocation} className="edit-location-form">
            <h4>Edit Location</h4>
            <input
              type="text"
              value={editingLocation.Location_Name}
              onChange={(e) =>
                setEditingLocation({
                  ...editingLocation,
                  Location_Name: e.target.value,
                })
              }
              placeholder="Location Name"
              required
            />
            <input
              type="text"
              value={editingLocation.Address}
              onChange={(e) =>
                setEditingLocation({
                  ...editingLocation,
                  Address: e.target.value,
                })
              }
              placeholder="Address"
              required
            />
            <input
              type="text"
              value={editingLocation.City}
              onChange={(e) =>
                setEditingLocation({ ...editingLocation, City: e.target.value })
              }
              placeholder="City"
              required
            />
            <input
              type="text"
              value={editingLocation.Country}
              onChange={(e) =>
                setEditingLocation({
                  ...editingLocation,
                  Country: e.target.value,
                })
              }
              placeholder="Country"
              required
            />
            <button type="submit" className="btn btn-info m-1">
              Update Location
            </button>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => setEditingLocation(null)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <table className="locations-table">
            <thead>
              <tr>
                <th>Location Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.Location_Id}>
                  <td>{location.Location_Name}</td>
                  <td>{location.Address}</td>
                  <td>{location.City}</td>
                  <td>{location.Country}</td>
                  <td>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => handleEditLocation(location)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => handleDeleteLocation(location.Location_Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManageLocations;

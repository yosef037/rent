import React, { useState, useEffect } from "react";
import { useAuth } from "../../pages/UserLogin/Authmodel"; // Assuming this provides user context
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for visibility toggle
import "./UserProfile.css"; // Optional: Add your styles here
import axiosInstance from "../admin/Axios";
const UserProfileSettings = ({ setShowLogin,onRequestClose }) => {
  const { user } = useAuth(); // Get user from Auth context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // For updating password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Populate form with user data when component mounts
  useEffect(() => {
    if (user) {
      setFirstName(user.First_name);
      setLastName(user.Last_name);
      setPhone(user.Phone);
      setEmail(user.Email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.User_Id) {
      console.log("User ID is missing.");
      alert("User ID is required.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        "http://localhost:5000/users/update-user",
        {
          First_name: firstName,
          Last_name: lastName,
          Phone: phone,
          Email: email,
          Password: password || undefined, // Send password only if provided
          User_Id: user.User_Id, // Include user ID
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        alert("User updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update user.");
    }
  };

  return (
    <div className="user-profile-settings">
      <h2>User Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password (optional)</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password input types
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "30px" }} // Add padding for icon
            />
            {/* Icon to toggle visibility */}
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileSettings;

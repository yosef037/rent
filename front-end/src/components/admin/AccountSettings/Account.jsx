import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios"; // Import your configured axios instance
import "./Account.css"; // Import CSS for styling
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle
import { useAuth } from "../../../pages/UserLogin/Authmodel";
import AdminNav from "../Navbar/AdminNav";

const AdminAccountSettings = () => {
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
      alert("User ID is required.");
      return;
    }

    try {
      await axiosInstance.put("/admin/account", {
        First_name: firstName,
        Last_name: lastName,
        Phone: phone,
        Email: email,
        Password: password || undefined, // Send password only if provided
        User_Id: user.User_Id,
      });

      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account.");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="admin-account-settings">
        <h2>Admin Account Settings</h2>
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
                placeholder="Enter new password"
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
            Update Account
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAccountSettings;

import React, { useState } from "react";
import { useAuth } from "../../pages/UserLogin/Authmodel"; // Assuming useAuth provides user context

const UserSettings = () => {
  const { user } = useAuth(); // Get user information
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Logic to change password
    if (password === confirmPassword) {
      // Call your API to update the password here
      console.log("Password changed successfully");
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <div className="profile-info">
        <h3>Profile Information</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <form onSubmit={handlePasswordChange} className="password-form">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>

      <div className="bookings">
        <h3>Your Bookings</h3>
        {/* Here you would map through user's bookings */}
        {/* Example placeholder for bookings */}
        <ul>
          <li>Booking 1</li>
          <li>Booking 2</li>
          <li>Booking 3</li>
        </ul>
      </div>

      <button className="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default UserSettings;

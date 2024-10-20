import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./RegisterPage.css"; // Ensure correct path
import { useAuth } from "./Authmodel";
const LoginPage = ({ setShowLogin, onRequestClose }) => {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from Auth context

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", values); // Ensure the endpoint is correct
      if (res.data.Status === "Success") {
        localStorage.setItem("userId", res.data.User_Id); // Store User ID
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("email", res.data.Email);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userName", res.data.role);
        localStorage.setItem("firstName", res.data.First_name);
        localStorage.setItem("lastName", res.data.Last_name);

        // console.log(`First Name ${res.data.First_name}`);

        // Define userData based on response
        const userData = {
          User_Id: res.data.User_Id, // Include User_Id here,
          Email: res.data.Email, // Ensure Email is included
          token: res.data.token,
          role: res.data.role,
          First_name: res.data.First_name,
          Last_name: res.data.Last_name,
        };
        login(userData); // Call the login function from context

        // console.log(`User Token: ${res.data.token}`); //To determine if the user is being received
        // console.log(`Last Name ${res.data.Last_name}`);
        if (res.data.role === "admin") {
          navigate("/admin");

          // navigate("/admin/add-vehicle"); // Redirect to admin dashboard
          // onRequestClose();
        } else if (res.data.role === "user") {
          navigate("/CarList"); // Redirect to user dashboard
          // onRequestClose();
        } else {
          alert("Unknown role");
        }
        onRequestClose(); // Close modal after successful login
      } else {
        setErrorMessage(res.data.Error || "Login failed!"); // Set error message
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred during login."); // Set generic error message
    }
  };

  return (
    <div className="loginPopup">
      <form className="loginPopup-container" onSubmit={handleSubmit}>
        <div className="loginPopup-title">
          <h2>Login</h2>
          <RxCross2 className="close-button" onClick={setShowLogin} />

          {/* <RxCross2 onClick={() => setShowLogin(false)} /> */}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Display error message */}
        <div className="loginPopup-inputs">
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setValues({ ...values, Email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, Password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => setShowLogin(false)}>Sign Up here</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

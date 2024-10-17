import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import "./RegisterPage.css"; // Ensure correct path

const RegisterPage = ({ setShowLogin, onRequestClose }) => {
  const [values, setValues] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Password: "",
    Phone: "",
    Role: "user",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", values);
      if (res.data.Status === "Success") {
        alert("Registered Successfully")
        setShowLogin(false);
      } else {
        alert("Error during registration");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="loginPopup">
      <form className="loginPopup-container" onSubmit={handleSubmit}>
        <div className="loginPopup-title">
          <h2>Sign Up</h2>
          <RxCross2 className="close-button" onClick={onRequestClose} />
        </div>
        <div className="loginPopup-inputs">
          <input
            type="text"
            placeholder="Your First name"
            onChange={(e) =>
              setValues({ ...values, First_name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Your Last name"
            onChange={(e) =>
              setValues({ ...values, Last_name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setValues({ ...values, Email: e.target.value })}
            required
          />
          <input
            type="tel" // Use tel for phone input
            placeholder="Your Phone Number"
            onChange={(e) => setValues({ ...values, Phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, Password: e.target.value })}
            required
          />

          <select
            onChange={(e) => setValues({ ...values, Role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <button>Create Account</button>
        <div className="loginPopup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        <p>
          Already have an account?{" "}
          <span onClick={() => setShowLogin(false)}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

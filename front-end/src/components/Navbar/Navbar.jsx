import logo from "../../assets/images/logo.png";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/UserLogin/Authmodel";
import SearchBar from "../Search Bar/SearchBar";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");
  const { user, logout } = useAuth(); // Get user and logout function from Auth context
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <nav className="header gap-3">
      <div className="navbar">
        <img src={logo} alt="" />
        <ul>
          <li>
            <Link
              to={"/"}
              onClick={() => setMenu("Home")}
              className={menu === "Home" ? "active" : ""}
            >
              Home
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link
              to={"/carList"}
              onClick={() => setMenu("CarList")}
              className={menu == "CarList" ? "active" : ""}
            >
              Car Listing
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to={"/locations"}
              onClick={() => setMenu("Locations")}
              className={menu === "Locations" ? "active" : ""}
            >
              Locations
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to={"/Contact"}
              onClick={() => setMenu("Contact")}
              className={menu === "Contact" ? "active" : ""}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="links">
        <form className="d-flex  " role="search">
          {/* <input
            className="form-control  h-25 "
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <SearchBar />
        </form>
        {!user ? ( // If no user is logged in, show Sign Up button
          <button
            className="btn btn-outline-light btn-sm"
            type="submit"
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Sign Up
          </button>
        ) : (
          // If a user is logged in, show Logout button
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        {/* <button
          className="btn btn-outline-light btn-sm "
          type="submit"
          onClick={() => {
            setShowLogin(true);
            // navigate("/register");
          }}
        >
          Sign Up
        </button> */}

        {/* {<VscAccount size={30} color="white" />} */}
      </div>
    </nav>
  );
};
export default Navbar;

import logo from "../../assets/images/logo.png";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../pages/UserLogin/Authmodel";
import SearchBar from "../Search Bar/SearchBar";
import { IoMdSettings } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { IoCalendarNumberSharp } from "react-icons/io5";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { user, logout } = useAuth(); // Get user and logout function from Auth context
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home or login page after logout
  };
  const getActiveClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Function to get initials
  const getInitials = (firstName) => {
    const firstInitial = firstName.charAt(0).toUpperCase(); // Get first letter and capitalize
    return `${firstInitial} `; // Return formatted initials
  };
  return (
    <nav className="header gap-3">
      <div className="navbar">
        <img src={logo} alt="" />
        <ul>
          <li>
            <Link to={"/"} className={getActiveClass("/")}>
              Home
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to={"/carList"} className={getActiveClass("/carList")}>
              Car Listing
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/locations"} className={getActiveClass("/locations")}>
              Locations
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/Contact"} className={getActiveClass("/contact")}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="links">
        <SearchBar />

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
          <div className="nav-item dropdown">
            <div className="nav-item dropdown pe-3 d-flex">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to={"./admin/account-settings"}
                data-bs-toggle="dropdown"
                aria-expanded="false" // Accessibility attribute
              >
                <VscAccount size={30} />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {getInitials(user.First_name)}. {user.Last_name}
                </span>
              </Link>
              {/* End Profile Image Icon */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h4>
                    {user.First_name} {user.Last_name}
                  </h4>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/user-profile"
                  >
                    <IoMdSettings />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item -flex align-items-center"
                    to="/view-bookings"
                  >
                    <IoCalendarNumberSharp />

                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to={"/help"} // Change this to your help page route
                  >
                    <FaRegQuestionCircle />
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout} // Replace with your logout function
                  >
                    <BsBoxArrowRight />
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </div>
          </div>
        )}

        {/* {<VscAccount size={30} color="white" />} */}
      </div>
    </nav>
  );
};
export default Navbar;

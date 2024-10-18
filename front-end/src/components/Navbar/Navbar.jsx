import logo from "../../assets/images/logo.png";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../pages/UserLogin/Authmodel";
import SearchBar from "../Search Bar/SearchBar";
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
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <VscAccount size={30} />
              {/* <span className="ps-2">Settings</span> */}
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/user-profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/view-bookings">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/help">
                  Need Help?
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* {<VscAccount size={30} color="white" />} */}
      </div>
    </nav>
  );
};
export default Navbar;

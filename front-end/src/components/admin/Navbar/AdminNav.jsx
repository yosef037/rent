import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useAuth } from "../../../pages/UserLogin/Authmodel";
import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import "./AdminNav.css";
import { IoMdSettings } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const { user, logout } = useAuth(); // Get user and logout function from Auth context
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home or login page after logout
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle function
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar
  const navigate = useNavigate();

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to={"/"} className="logo d-flex align-items-center ">
            <img src={logo} alt="" />
          </Link>

          <div className="title " onClick={() => navigate("/admin")}>
            <h3>Admin Dashboard</h3>
          </div>
          <FaBarsStaggered
            className="toggle-sidebar-btn"
            onClick={toggleSidebar}
          />
        </div>

        {/* <!-- End Logo --> */}

        <div className="search">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <IoIosSearch />
            </button>
          </form>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
              <IoIosSearch />
            </li>
            {/* <!-- End Search Icon--> */}

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/* <i className="bi bi-bell"></i> */}
                <IoNotificationsOutline />
                <span className="badge bg-primary badge-number">4</span>
              </a>
              {/* <!-- End Notification Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
              {/* <!-- End Notification Dropdown Items --> */}
            </li>
            {/* <!-- End Notification Nav --> */}

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/* <i className="bi bi-chat-left-text"></i> */}
                <AiOutlineMessage />
                <span className="badge bg-success badge-number">3</span>
              </a>
              {/* <!-- End Messages Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
              {/* <!-- End Messages Dropdown Items --> */}
            </li>
            {/* <!-- End Messages Nav --> */}

            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to={"./admin/account-settings"}
                data-bs-toggle="dropdown"
                aria-expanded="false" // Accessibility attribute
              >
                <CgProfile />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  J. Mwango
                </span>
              </Link>
              {/* End Profile Image Icon */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Joseph Mwango</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/account-settings" // Change this to your actual settings route
                  >
                    <IoMdSettings />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to={""} // Change this to your help page route
                  >
                    <FaRegQuestionCircle />
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    onClick={handleLogout} // Replace with your logout function
                  >
                    <BsBoxArrowRight />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </li>

            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --></header> */}
      </header>
      <aside
        id="sidebar"
        className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}
      >
        {" "}
        {/* Conditional className */}
        {/* <aside id="sidebar" className="sidebar"> */}
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to={"/admin"}>
              <SiHomeassistantcommunitystore />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/manage-vehicles" className="nav-link collapsed">
              <IoCarSportSharp />

              <span>Manage Vehicles</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/manage-bookings" className="nav-link collapsed">
              <IoCalendarNumberSharp />
              <span>Manage Bookings</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to={"/admin/manage-users"}>
              <FaRegUserCircle />
              <span>Manage Users</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to={"/admin/manage-locations"}>
              <FaLocationDot />
              <span>Manage Locations</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};
export default AdminNav;

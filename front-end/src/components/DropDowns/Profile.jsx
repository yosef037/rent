import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "./Profile.css";

const TestDropdown = () => {
  return (
    <div className="nav-item dropdown">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <VscAccount size={30} />
        <span className="ps-2">Settings</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" to="/user-profile">
            My Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/account-settings">
            Account Settings
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
          <a className="dropdown-item" href="#">
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TestDropdown;

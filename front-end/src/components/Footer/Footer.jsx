import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons
import "./Footer.css"; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/carList">Car Listing</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <h3>Vehicle Rental</h3>
        <p>
          Get exclusive offers and updates by subscribing to our newsletter!
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your Email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-socials">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Vehicle Rental. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

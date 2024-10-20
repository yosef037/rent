import React from "react";
import "./Home.css"; // Import CSS for styling
import VehiclesAvailable from "../../components/VehicleAvailable/VehiclesAvailable";
import { Link } from "react-router-dom";

const Home = ({ setShowLogin, onRequestClose }) => {
  return (
    <div className="home">
      <header className="hero-section">
        <h1>Welcome to Our Vehicle Rental Service</h1>
        <p>Your one-stop solution for renting vehicles in Zambia.</p>
        <Link to={"/carList"}>
          <button className="btn-explore">Explore Now</button>
        </Link>
      </header>
      <VehiclesAvailable setShowLogin={setShowLogin} />

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>Choose from a variety of vehicles to suit your needs.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Rates</h3>
            <p>Enjoy competitive pricing with no hidden fees.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>We're here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* <section className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form className="newsletter-form">
          <input type="email" placeholder="Your Email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section> */}
    </div>
  );
};

export default Home;

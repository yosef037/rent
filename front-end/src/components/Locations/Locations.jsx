import React from "react";
import "./Locations.css"; // Import CSS for styling
import LocationsList from "./LocationList";

const Locations = () => {
  return (
    <div className="locations-container">
      <h1>Our Locations in Zambia</h1>
        <LocationsList />
      <p>Find our rental locations across Zambia.</p>
      <div className="map-container">
        {/* Embed Google Maps */}
        <iframe
          title="Zambia Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982935.8929821973!2d22.08405629056984!3d-13.133897759812486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19b7b7e8c4b7a9b5%3A0x9c8e8e9c8e8e8e8e!2sZambia!5e0!3m2!1sen!2suk!4v1634087861234!5m2!1sen!2suk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Locations;

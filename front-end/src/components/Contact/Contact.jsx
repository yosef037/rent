import React from "react";
import "./Contact.css"; // Import CSS for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out!</p>

      <div className="contact-info">
        <h2>Our Address</h2>
        <p>123 Vehicle Rental St.</p>
        <p>Lusaka, Zambia</p>
        <p>Email: info@vehiclerental.com</p>
        <p>Phone: +260 123 456 789</p>
      </div>

      <form className="contact-form">
        <h2>Get in Touch</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;

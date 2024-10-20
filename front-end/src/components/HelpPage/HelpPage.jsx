// HelpPage.js
import React from "react";
import "./HelpPage.css"; // Import the CSS file for styling

const HelpPage = () => {
  return (
    <div className="help-page">
      <header className="help-header">
        <h1>Help Center</h1>
        <input
          type="text"
          placeholder="Search for help..."
          className="search-bar"
        />
      </header>

      <nav className="categories">
        <ul>
          <li>
            <a href="#account">Account Management</a>
          </li>
          <li>
            <a href="#troubleshooting">Troubleshooting</a>
          </li>
          <li>
            <a href="#billing">Billing</a>
          </li>
        </ul>
      </nav>

      <section id="account" className="faq-section">
        <h2>Account Management</h2>
        <div className="faq">
          <h3>How do I reset my password?</h3>
          <p>
            To reset your password, click on 'Forgot Password' on the login page
            and follow the instructions.
          </p>
        </div>
        <div className="faq">
          <h3>How do I update my email address?</h3>
          <p>
            You can update your email address in your account settings under
            'Profile'.
          </p>
        </div>
      </section>

      <section id="troubleshooting" className="faq-section">
        <h2>Troubleshooting</h2>
        <div className="faq">
          <h3>Why can't I log in?</h3>
          <p>
            If you are having trouble logging in, ensure that your email and
            password are correct. If you forgot your password, use the reset
            link.
          </p>
        </div>
        <div className="faq">
          <h3>The app is crashing. What should I do?</h3>
          <p>
            Please try restarting the app. If the issue persists, contact
            support for assistance.
          </p>
        </div>
      </section>

      <section id="billing" className="faq-section">
        <h2>Billing</h2>
        <div className="faq">
          <h3>How do I view my billing history?</h3>
          <p>
            Your billing history can be found in the 'Billing' section of your
            account settings.
          </p>
        </div>
        <div className="faq">
          <h3>Can I change my payment method?</h3>
          <p>
            Yes, you can update your payment method under 'Payment Information'
            in your account settings.
          </p>
        </div>
      </section>

      <footer className="help-footer">
        <p>Need more help? Contact us at support@example.com.</p>
      </footer>
    </div>
  );
};

export default HelpPage;

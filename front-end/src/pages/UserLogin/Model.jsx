import React, { useState } from "react";
import Modal from "react-modal"; // Ensure you have this package installed
import RegisterPage from "./Register";
import LoginPage from "./Login";
import { RxCross2 } from "react-icons/rx"; // Import the close icon
import CarListing from "../CarListing/CarList";
import "./Model.css";

const AuthModal = ({
  isOpen,
  onRequestClose,
  setIsRegistering,
  isRegistering,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      setIsRegistering={setIsRegistering}
      className="loginPopup"
    >
      {/* <RxCross2 className="close-button" onClick={onRequestClose} /> */}
      {isRegistering ? (
        <>
          <LoginPage
            setShowLogin={() => setIsRegistering(false)}
            onRequestClose={onRequestClose}
          />
        </>
      ) : (
        <>
          <RegisterPage
            setShowLogin={() => setIsRegistering(true)}
            onRequestClose={onRequestClose}
          />
        </>
      )}
    </Modal>
  );
};

export default AuthModal;

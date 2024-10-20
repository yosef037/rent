import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AuthModal from "./pages/UserLogin/Model";
import Modal from "react-modal"; // Import Modal
import { AuthProvider } from "./pages/UserLogin/Authmodel";
import ProtectedRoute from "./pages/UserLogin/Protect";
import BookingForm from "./components/Bookings/BookingForm";
import ViewBookings from "./components/Bookings/MyBooking";
import ManageBooking from "./components/admin/Bookings/ManageBooking";
import ManageVehicle from "./components/admin/Vehicles/ManageVehicles";
import VehicleDetail from "./pages/CarListing/VehicleDetail";
import CarListing from "./pages/CarListing/CarList";
import SearchResults from "./components/Search Bar/SearchResults";
import Locations from "./components/Locations/Locations";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import AdminDash from "./components/admin/DashBoard/AdminDash";
import UserProfileSettings from "./components/Users/UserProfile";
import VehiclesAvailable from "./components/VehicleAvailable/VehiclesAvailable";
import ManageUsers from "./components/admin/Users/ManageUsers";
import ManageLocations from "./components/admin/Locations/ManageLocations";
import AdminAccountSettings from "./components/admin/AccountSettings/Account";
import LoginPage from "./pages/UserLogin/Login";
import HelpPage from "./components/HelpPage/HelpPage";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element for accessibility
  }, []);

  return (
    <AuthProvider>
      <Router>
        <>
          {/* {showLogin ? <RegisterPage setShowLogin={setShowLogin} /> : <></>} */}
          <Navbar setShowLogin={setModalIsOpen} />

          {/* Modal for Authentication */}
          <AuthModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            setIsRegistering={setIsRegistering}
            isRegistering={isRegistering}
          />

          {/* Main Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <AdminDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-bookings"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <ManageBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-vehicles"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <ManageVehicle />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/manage-users"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-locations"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <ManageLocations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/account-settings"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <AdminAccountSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute
                  requiredRole="user"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-bookings"
              element={
                <ProtectedRoute
                  requiredRole="user"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <ViewBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute
                  requiredRole="user"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <UserProfileSettings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/search-results"
              element={
                <SearchResults
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/carList"
              element={
                <CarListing
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/locations"
              element={
                <Locations
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/help"
              element={
                <HelpPage
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/vehicles/:id"
              element={
                <VehicleDetail
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            <Route
              path="/vehicles/available"
              element={
                <VehiclesAvailable
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                />
              }
            />
            {/* Add other routes as needed */}
          </Routes>
          <Footer setShowLogin={setModalIsOpen} />
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;

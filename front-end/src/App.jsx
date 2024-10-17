import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AuthModal from "./pages/UserLogin/Model";
import Modal from "react-modal"; // Import Modal
import AddVehicle from "./components/AddCar";
import { AuthProvider } from "./pages/UserLogin/Authmodel";
import ProtectedRoute from "./pages/UserLogin/Protect";
import BookingForm from "./components/Bookings/BookingForm";
import ViewBookings from "./components/Bookings/MyBooking";
import AdminBookings from "./components/admin/Admin";
import ManageBooking from "./components/admin/ManageBooking";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageVehicle from "./components/admin/ManageVehicles";
import VehicleDetail from "./pages/CarListing/VehicleDetail";
import CarListing from "./pages/CarListing/CarList";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "./components/Search Bar/SearchResults";
import Locations from "./components/Locations/Locations";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Dashboard from "./components/admin/Dash";
import AdminDash from "./components/admin/adminDash";

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
            <Route path="/" element={<Home />} />
            <Route
              path="/admin/add-vehicle"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <AddVehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/approve"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            /> */}
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
              path="/admin/dash"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <Dashboard />
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
            {/* <Route
              path="/cars"
              element={
                <ProtectedRoute
                  setShowLogin={setModalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <Cars />
                </ProtectedRoute>
              }
            /> */}

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
              path="/vehicles/:id"
              element={
                <VehicleDetail
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VehiclesAvailable.css"; // Import CSS for styling
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/UserLogin/Authmodel";

const VehiclesAvailable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth(); // Get user data from Auth context

  useEffect(() => {
    const fetchAvailableVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/vehicles", {
          params: { status: "available" }, // Adjust based on your API
        });
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setErrorMessage("Failed to load available vehicles.");
      }
    };

    fetchAvailableVehicles();
  }, []);

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  return (
    <div className="vehicles-available">
      {/* <h2>Available Vehicles</h2> */}
      <div className="vehicle-cards">
        {vehicles.map((vehicle) => (
          <div key={vehicle.Vehicle_Id} className="vehicle-card">
            <Link to={`/vehicles/${vehicle.Vehicle_Id}`}>
              <img
                src={`http://localhost:5000${vehicle.Image_1}`}
                alt={`${vehicle.Make} ${vehicle.Model}`}
                className="vehicle-image"
              />
            </Link>
            <h3>{`${vehicle.Make} ${vehicle.Model}`}</h3>
            <p>
              <strong>Price per Day:</strong> ${vehicle.Price_Per_Day}
            </p>
            <p>
              <strong>Description:</strong> {vehicle.Vehicle_Description}
            </p>

            <div className="button-container">
              <Link to={`/vehicles/${vehicle.Vehicle_Id}`}>
                <button className="btn-details">View Details</button>
              </Link>
              {user ? (
                <Link
                  to={`/vehicles/${vehicle.Vehicle_Id}`}
                  state={{ userEmail: user.Email }} // Pass user email via state
                >
                  <button className="btn-details">Book This Vehicle</button>
                </Link>
              ) : (
                <button
                  className="btn-details"
                  onClick={() => alert("Please log in to book.")}
                >
                  Login to Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesAvailable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./VehiclesAvailable.css"; // Import CSS for styling
// import { Link } from "react-router-dom";
// import { useAuth } from "../../pages/UserLogin/Authmodel";

// const VehiclesAvailable = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const { user } = useAuth(); // Get user data from Auth context

//   useEffect(() => {
//     const fetchAvailableVehicles = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/vehicles", {
//           params: { status: "available" }, // Adjust based on your API
//         });
//         setVehicles(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//         setErrorMessage("Failed to load available vehicles.");
//       }
//     };

//     fetchAvailableVehicles();
//   }, []);

//   if (errorMessage) {
//     return <p className="text-danger">{errorMessage}</p>;
//   }

//   return (
//     <div className="vehicles-available">
//       <h2>Available Vehicles</h2>
//       <div className="vehicle-cards">
//         {vehicles.map((vehicle) => (
//           <div key={vehicle.Vehicle_Id} className="vehicle-card">
//             <Link to={`/vehicles/${vehicle.Vehicle_Id}`}>
//               <img
//                 src={`http://localhost:5000${vehicle.Image_1}`}
//                 alt={`${vehicle.Make} ${vehicle.Model}`}
//                 className="vehicle-image"
//               />
//             </Link>
//             <h3>{`${vehicle.Make} ${vehicle.Model}`}</h3>
//             <p>
//               <strong>Price per Day:</strong> ${vehicle.Price_Per_Day}
//             </p>
//             <p>
//               <strong>Description:</strong> {vehicle.Vehicle_Description}
//             </p>

//             <Link to={`/vehicles/${vehicle.Vehicle_Id}`}>
//               <button className="btn-details">View Details</button>
//             </Link>
//             {user ? ( // Check if user is logged in
//               <Link
//                 // to={`/booking/${vehicle.Vehicle_Id}`}
//                 to={`/vehicles/${vehicle.Vehicle_Id}`}
//                 state={{ userEmail: user.Email }} // Pass user email via state
//                 className="btn btn-primary"
//               >
//                 Book This Vehicle
//               </Link>
//             ) : (
//               <button
//                 className="btn btn-primary"
//                 onClick={() => setShowLogin(true)} // Show login modal
//               >
//                 Login to Book
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VehiclesAvailable;

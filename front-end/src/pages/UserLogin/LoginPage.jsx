// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import "./RegisterPage.css";

// const LoginPage = () => {
//   const [values, setValues] = useState({
//     Email: "",
//     Password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState(""); // State for error messages
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:5000/users/login", values) // Ensure the endpoint is correct
//       .then((res) => {
//         console.log("Full response from server:", res.data);
//         if (res.data.Status === "Success") {
//           // Store User_Id
//           localStorage.setItem("userId", res.data.userId);

//           // Store JWT in localStorage
//           const { token, role } = res.data;
//           localStorage.setItem("token", token); // Store token
//           localStorage.setItem("role", role);

//           // Redirect based on role
//           if (role === "admin") {
//             navigate("/add"); // Redirect to admin dashboard
//           } else if (role === "user") {
//             navigate("/CarList"); // Redirect to user dashboard
//           } else {
//             alert("Unknown role");
//           }
//         } else {
//           setErrorMessage(res.data.Error || "Login failed!"); // Set error message
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setErrorMessage("An error occurred during login."); // Set generic error message
//       });
//   };

//   return (
//     <div>
//       <div className="loginPopup">
//         <form className="loginPopup-container" onSubmit={handleSubmit}>
//           <div className="loginPopup-title">
//             <h2>Login</h2>
//             <RxCross2
//               onClick={() => {
//                 /* Close login popup logic */
//               }}
//             />
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
//           {/* Display error message */}
//           <div className="loginPopup-inputs">
//             <input
//               type="email" // Use lowercase for HTML input types
//               placeholder="Your Email"
//               onChange={(e) => setValues({ ...values, Email: e.target.value })}
//               required
//             />
//             <input
//               type="password" // Use lowercase for HTML input types
//               placeholder="Password"
//               onChange={(e) =>
//                 setValues({ ...values, Password: e.target.value })
//               }
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//           <p>
//             Create a new account?{" "}
//             <Link to={"/register"}>
//               <span>Click here</span>
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// // const LoginPage = () => {
// //   const [values, setValues] = useState({
// //     Email: "",
// //     Password: "",
// //   });

// //   const navigate = useNavigate();
// //   axios.defaults.withCredentials = true;
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     axios
// //       .post("http://localhost:5000/users", values)
// //       .then((res) => {
// //         console.log("Full response from server:", res.data);
// //         if (res.data.Status === "Success") {
// //           // Store User_Id
// //           localStorage.setItem("userId", res.data.userId);
// //           // Stores Token

// //           // const token = localStorage.getItem("token");
// //           // axios.post(
// //           //   "http://localhost:5000/bookings",
// //           //   { vehicleId, date },
// //           //   { headers: { Authorization: `Bearer ${token}` } }
// //           // );

// //           // Store JWT in localStorage
// //           // localStorage.setItem("token", res.data.token);

// //           // Extract role from server response
// //           const { token, role } = res.data;
// //           localStorage.setItem("token", token); // Store token

// //           localStorage.setItem("role", role);

// //           // Redirect based on role
// //           if (role === "admin") {
// //             navigate("/add"); // Redirect to admin dashboard
// //           } else if (role === "user") {
// //             navigate("/CarList"); // Redirect to user dashboard
// //             // navigate('/user-dashboard'); // Redirect to user dashboard
// //           } else {
// //             alert("Unknown role");
// //           }
// //         } else {
// //           alert(res.data.Error);
// //         }
// //       })
// //       .catch((err) => console.log(err));
// //   };
// //   return (
// //     <div>
// //       <div className="loginPopup">
// //         <form className="loginPopup-container" onSubmit={handleSubmit}>
// //           <div className="loginPopup-title">
// //             <h2>Login</h2>
// //             <RxCross2 onClick={() => setShowLogin(false)} />
// //           </div>
// //           <div className="loginPopup-inputs">
// //             <input
// //               type="Email"
// //               placeholder="Your Email"
// //               onChange={(e) => setValues({ ...values, Email: e.target.value })}
// //               required
// //             />
// //             <input
// //               type="Password"
// //               placeholder="Password"
// //               onChange={(e) =>
// //                 setValues({ ...values, Password: e.target.value })
// //               }
// //               required
// //             />
// //           </div>

// //           <button>Login</button>
// //           <p>
// //             Create a new account?{" "}
// //             <Link to={"/register"}>
// //               <span>Click here</span>
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// // export default LoginPage;
// {
//   /* <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 w-25">
//         <h2>Sign In</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="Email"
//               placeholder="Enter Email"
//               name="Email"
//               className="form-control rounded"
//               onChange={(e) => setValues({ ...values, Email: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="Password"
//               placeholder="Enter Password"
//               name="Password"
//               className="form-control rounded"
//               onChange={(e) =>
//                 setValues({ ...values, Password: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <button className="btn btn-success w-100  rounded-0">Login</button>
//             <p>By Clicking Sign Up you agree to the Terms and Policies</p>
//             <Link to={"/register"}>
//               <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//                 Create Account
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div> */
// }

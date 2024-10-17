// import { createConnection } from "mysql2";
// import mysql from "mysql2";
import { createConnection } from "mysql2";

// MySQL connection
const db = createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "cars_rentals", // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

export default db;
// module.exports = db;

//   import mysql from "mysql2";
// // MySQL connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root", // Replace with your MySQL username
//     password: "", // Replace with your MySQL password
//     database: "cars_rental_management_system", // Replace with your database name
//   });

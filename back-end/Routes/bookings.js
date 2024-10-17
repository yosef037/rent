const express = require("express");
const db = require("./db"); // Your MySQL connection

const app = express;

app.post("/bookings", (req, res) => {
  const { Vehicle_Id, User_Id, Booking_Start, Booking_End } = req.body;

  // Check if the vehicle is available for the selected dates
  const availabilityCheckQuery = `
        SELECT * FROM bookings 
        WHERE Vehicle_Id = ? 
        AND (Booking_Start <= ? AND Booking_End >= ?);
    `;

  db.query(
    availabilityCheckQuery,
    [Vehicle_Id, Booking_End, Booking_Start],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({
            message: "Vehicle is not available for the selected dates.",
          });
      }

      // If vehicle is available, proceed to insert booking
      const sql = `INSERT INTO bookings (Vehicle_Id, User_Id, Booking_Start, Booking_End, Status)
                     VALUES (?, ?, ?, ?, 'pending')`;

      db.query(
        sql,
        [Vehicle_Id, User_Id, Booking_Start, Booking_End],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({
            message: "Booking created successfully",
            bookingId: result.insertId,
          });
        }
      );
    }
  );
});

import db from "./config/database.js";
import express, { response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import verifyToken from "./Middleware/VerifyToken.js";
import authorizeRole from "./Middleware/VerifyRole.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// import bodyParser from "body-parser";

const app = express();
const port = 5000; // Backend server port
const salt = 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });
// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// Get count of bookings
app.get(
  "/admin/bookings/count",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const query = "SELECT COUNT(*) AS count FROM bookings"; // Adjust based on your database schema
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching bookings count:", err);
        return res.status(500).json({ error: err.message });
      }

      // Log the count received from the database
      res.json({ count: results[0].count });
    });
  }
);

// Get count of vehicles
app.get(
  "/admin/vehicles/count",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const query = "SELECT COUNT(*) AS count FROM vehicles"; // Adjust based on your database schema
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching vehicles count:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ count: results[0].count });
    });
  }
);

// Get count of users
app.get(
  "/admin/users/count",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const query = "SELECT COUNT(*) AS count FROM users"; // Adjust based on your database schema
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users count:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ count: results[0].count });
    });
  }
);

// Get count of locations
app.get(
  "/admin/locations/count",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const query = "SELECT COUNT(*) AS count FROM locations"; // Adjust based on your database schema
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching locations count:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ count: results[0].count });
    });
  }
);

// Get all locations
app.get("/locations", (req, res) => {
  const query = "SELECT * FROM locations"; // Adjust based on your database schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results); // Return the list of locations
  });
});

// Get all bookings (admin only)
app.get("/admin/bookings", verifyToken, authorizeRole("admin"), (req, res) => {
  const query = "SELECT * FROM bookings"; // Adjust based on your database schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// Confirm a booking
app.put(
  "/bookings/:id/approve",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const bookingId = req.params.id;

    const query = `
    UPDATE bookings
    SET Status = 'confirmed'
    WHERE Booking_Id = ?
  `;

    db.query(query, [bookingId], (err, result) => {
      if (err) {
        console.error("Error updating booking status:", err);
        return res
          .status(500)
          .json({ error: "Failed to update booking status" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json({ message: "Booking approved successfully" });
    });
  }
);

// Reject a booking
app.delete("/bookings/:id", verifyToken, authorizeRole("admin"), (req, res) => {
  const bookingId = req.params.id;

  const query = `
    DELETE FROM bookings
    WHERE Booking_Id = ?
  `;

  db.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      return res.status(500).json({ error: "Failed to delete booking" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking rejected successfully" });
  });
});

// Get all users (admin only)
app.get("/admin/users", verifyToken, authorizeRole("admin"), (req, res) => {
  const query = "SELECT * FROM users"; // Adjust based on your database schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// Get all available vehicles (admin only)
app.get("/admin/vehicles", verifyToken, authorizeRole("admin"), (req, res) => {
  const query = "SELECT * FROM vehicles WHERE Status = 'available'"; // Adjust based on your schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching vehicles:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// API to add vehicles
// API endpoint to add a new vehicle with images
app.post(
  "/admin/vehicles/add",
  upload.array("images", 5),
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const {
      Make,
      Model,
      Year,
      Color,
      License_Plate,
      Vehicle_Description,
      Fuel_Type,
      Seating_Capacity,
      Price_Per_Day,
    } = req.body;

    // Prepare image paths for database storage
    const imagesPaths = req.files.map((file) => `/uploads/${file.filename}`); // Create paths for each uploaded file

    // SQL query to insert a new vehicle into the database
    const query = `
    INSERT INTO vehicles (Make, Model, Year, Color, License_Plate,
                          Vehicle_Description, Fuel_Type,
                          Seating_Capacity, Price_Per_Day,
                          Image_1, Image_2, Image_3, Image_4, Image_5)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
      query,
      [
        Make,
        Model,
        Year,
        Color,
        License_Plate,
        Vehicle_Description,
        Fuel_Type,
        Seating_Capacity,
        Price_Per_Day,
        ...imagesPaths,
      ], // Spread operator to include image paths
      (err) => {
        if (err) {
          console.error("Error inserting vehicle:", err);
          return res.status(500).json({ error: "Failed to add vehicle" });
        }
        res.status(201).json({ message: "Vehicle added successfully" });
      }
    );
  }
);

// API to edit vehicles
app.put(
  "/vehicles/:id",
  upload.array("images", 5),
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const vehicleId = req.params.id;
    const {
      Make,
      Model,
      Year,
      Color,
      License_Plate,
      Vehicle_Description,
      Fuel_Type,
      Seating_Capacity,
      Price_Per_Day,
    } = req.body;

    // Prepare image paths if any are uploaded
    const imagesPaths = req.files.map((file) => `/uploads/${file.filename}`);

    // SQL query to update the vehicle in the database
    const query = `
    UPDATE vehicles 
    SET Make = ?, Model = ?, Year = ?, Color = ?, License_Plate = ?,
        Vehicle_Description = ?, Fuel_Type = ?, Seating_Capacity = ?,
        Price_Per_Day = ?,
        Image_1 = ?, Image_2 = ?, Image_3 = ?, Image_4 = ?, Image_5 = ?
    WHERE Vehicle_Id = ?
  `;

    db.query(
      query,
      [
        Make,
        Model,
        Year,
        Color,
        License_Plate,
        Vehicle_Description,
        Fuel_Type,
        Seating_Capacity,
        Price_Per_Day,
        ...imagesPaths,
        vehicleId,
      ], // Include vehicleId at the end
      (err) => {
        if (err) {
          console.error("Error updating vehicle:", err);
          return res.status(500).json({ error: "Failed to update vehicle" });
        }
        res.json({ message: "Vehicle updated successfully" });
      }
    );
  }
);

// API to delete vehicles
app.delete("/vehicles/:id", verifyToken, authorizeRole("admin"), (req, res) => {
  const vehicleId = req.params.id;

  const query = "DELETE FROM vehicles WHERE Vehicle_Id = ?";
  db.query(query, [vehicleId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  });
});

// API endpoint to add a new vehicle with images
app.post("/vehicles/add", upload.array("images", 5), (req, res) => {
  // Adjusted to use multer for multiple files
  const {
    Make,
    Model,
    Year,
    Color,
    License_Plate,
    Vehicle_Description,
    Fuel_Type,
    Seating_Capacity,
    Price_Per_Day,
  } = req.body;

  // Prepare image paths for database storage
  const imagesPaths = req.files.map((file) => `/uploads/${file.filename}`); // Create paths for each uploaded file

  // SQL query to insert a new vehicle into the database
  const query = `
    INSERT INTO vehicles (Make, Model, Year, Color, License_Plate, Vehicle_Description, Fuel_Type, Seating_Capacity, Price_Per_Day, Image_1, Image_2, Image_3, Image_4, Image_5)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      Make,
      Model,
      Year,
      Color,
      License_Plate,
      Vehicle_Description,
      Fuel_Type,
      Seating_Capacity,
      Price_Per_Day,
      ...imagesPaths, // Spread operator to include image paths
    ],
    (err) => {
      if (err) {
        console.error("Error inserting vehicle:", err);
        return res.status(500).json({ error: "Failed to add vehicle" });
      }
      res.status(201).json({ message: "Vehicle added successfully" });
    }
  );
});
// Carlisting
// Search Bar
app.get("/vehicles", (req, res) => {
  const { search } = req.query; // Get search parameter from query string
  let query = "SELECT * FROM vehicles WHERE Status = 'available'"; // Base query

  if (search) {
    // If there's a search query, modify the SQL query
    query += ` AND (Make LIKE ? OR Model LIKE ?)`;
  }

  db.query(query, [`%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error("Error fetching vehicles:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Return filtered results
  });
});

// Endpoint to fetch cars
app.get("/vehicles", (req, res) => {
  const query = "SELECT * FROM vehicles"; // Adjust query based on your database schema
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.get("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;

  const query = "SELECT * FROM vehicles WHERE Vehicle_Id = ?";
  db.query(query, [vehicleId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Vehicle not found" });
    res.json(result[0]); // Return the first matching vehicle
  });
});

// Endpoint to get bookings by user email
app.get("/bookings", (req, res) => {
  const email = req.query.email; // Get email from query parameters

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const query = `
    SELECT b.*, 
           v.Image_1, v.Image_2, v.Image_3, v.Image_4, v.Image_5 
    FROM bookings b 
    LEFT JOIN vehicles v ON b.Vehicle_Id = v.Vehicle_Id 
    WHERE b.Email = ?
  `;

  db.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(results); // Send the results back to the client
  });
});

// API to Create Bookings
app.post("/bookings", verifyToken, authorizeRole("user"), (req, res) => {
  const { Vehicle_Id, Email, Start_Date, End_Date, Message } = req.body;
  // Generate a unique booking number
  const Booking_Number = `BOOK-${Date.now()}`;

  // SQL query to insert a new booking into the database
  const query = `
    INSERT INTO bookings (Booking_Number, Vehicle_Id, Email, Start_Date, End_Date, Message)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [Booking_Number, Vehicle_Id, Email, Start_Date, End_Date, Message],
    (err) => {
      if (err) {
        console.error("Error inserting booking:", err); // Log the error
        return res.status(500).json({ error: "Failed to create booking" });
      }
      res
        .status(201)
        .json({ message: "Booking created successfully", Booking_Number });
    }
  );
});

// API to Edit Bookings
app.put(
  "/bookings/:id/status",
  verifyToken,
  authorizeRole("user"),
  (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body; // Expecting { status: 'confirmed' }

    const validStatuses = ["pending", "confirmed", "canceled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const query = `
    UPDATE bookings 
    SET Status = ? 
    WHERE Booking_Id = ?
  `;

    db.query(query, [status, bookingId], (err) => {
      if (err) {
        console.error("Error updating booking status:", err);
        return res
          .status(500)
          .json({ error: "Failed to update booking status" });
      }

      res.json({ message: "Booking status updated successfully" });
    });
  }
);

// User Vrification and login
app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO users(First_name,Last_name,Email,Password,Phone,Role) VALUES(?)";
  bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for Hashing password" });
    const values = [
      req.body.First_name,
      req.body.Last_name,
      req.body.Email,
      hash,
      req.body.Phone,
      req.body.Role,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error inserting data in server" });
      return res.json({ Status: "Success" });
    });
  });
});

app.get("/", (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [req.body.Email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.Password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const email = data[0].Email;
            const name = data[0].First_name; // Assuming First_name is stored in the users table
            const role = data[0].Role; // Assuming Role is stored in the users table
            const userId = data[0].User_Id; // Get User_Id from database
            const token = jwt.sign({ email, role }, "jwt-secret-key", {
              expiresIn: "1d",
            }); // Include role in token
            res.cookie("token", token);

            return res.json({
              Status: "Success",
              role: role,
              token: token,
              Email: email,
              User_Id: userId, // Send User_Id in the response
            });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// Add a new vehicle
app.post("/add-vehicle", verifyToken, authorizeRole("admin"), (req, res) => {
  // Admin-only functionality here
});
app.post("/vehicles", verifyToken, authorizeRole("admin"), (req, res) => {
  const { Make, Model, Year, Color, License_Plate, Status, Outlet_Id } =
    req.body;
  const sql =
    "INSERT INTO Vehicles ( Make, Model, Year, Color,License_Plate, Status,Outlet_Id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [Make, Model, Year, Color, License_Plate, Status, Outlet_Id],
    (err, results) => {
      if (err) throw err;
      res.status(201).json({ id: results.insertId });
    }
  );
});

// PUT request to update vehicle data
app.put("/vehicles/:id", verifyToken, authorizeRole("admin"), (req, res) => {
  const VehicleId = req.params.id;
  const { Make, Model, Year, Color, License_Plate, Status } = req.body;

  console.log("Updating vehicle with ID:", VehicleId); // Log the vehicle ID
  console.log("Request body:", req.body); // Log the request body

  // Update query
  const sql = `UPDATE vehicles 
               SET Make = ?, Model = ?, Year = ?, Color = ?, License_Plate =?, Status = ? 
               WHERE Vehicle_Id = ?`;

  // Values to be updated
  const values = [Make, Model, Year, Color, License_Plate, Status, VehicleId];
  console.log("SQL Query:", sql, values);

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating the vehicle:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({
      message: "Vehicle updated successfully",
      updatedVehicleId: VehicleId,
    });
  });
});

// DELETE request to delete a vehicle by Vehicle_Id
app.delete("/vehicles/:id", verifyToken, authorizeRole("admin"), (req, res) => {
  const vehicleId = req.params.id;

  const sql = "DELETE FROM vehicles WHERE Vehicle_Id = ?";

  db.query(sql, [vehicleId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({
      message: "Vehicle deleted successfully",
      deletedVehicleId: vehicleId,
    });
  });
});

// Get admin account details
app.get("/admin/account", verifyToken, authorizeRole("admin"), (req, res) => {
  const query =
    "SELECT First_name, Last_name, Email, Phone FROM users WHERE User_Id = ?"; // Adjust based on your database schema
  const userId = req.user.id; // Assuming you have user ID in the token

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching account details:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(results[0]); // Return admin details
  });
});

// Update admin account details
app.put("/admin/account", verifyToken, authorizeRole("admin"), (req, res) => {
  const { First_name, Last_name, Email, Phone, Password } = req.body;
  const userId = req.user.id; // Assuming you have user ID in the token

  // If a password is provided, hash it
  const updates = [First_name, Last_name, Email, Phone];
  
  // Check if password needs to be updated
  if (Password) {
    bcrypt.hash(Password, salt, (err, hash) => {
      if (err) return res.status(500).json({ error: "Error hashing password" });
      updates.push(hash); // Add hashed password to updates
      updates.push(userId); // Add userId for the query

      const query = `
        UPDATE users 
        SET First_name = ?, Last_name = ?, Email = ?, Phone = ?, Password = ?
        WHERE User_Id = ?
      `;

      db.query(query, updates, (err) => {
        if (err) {
          console.error("Error updating account details:", err);
          return res.status(500).json({ error: "Failed to update account" });
        }
        res.json({ message: "Account updated successfully" });
      });
    });
  } else {
    updates.push(userId); // Add userId for the query

    const query = `
      UPDATE users 
      SET First_name = ?, Last_name = ?, Email = ?, Phone = ?
      WHERE User_Id = ?
    `;

    db.query(query, [...updates], (err) => {
      if (err) {
        console.error("Error updating account details:", err);
        return res.status(500).json({ error: "Failed to update account" });
      }
      res.json({ message: "Account updated successfully" });
    });
  }
});


// Update user details
app.put(
  "/users/update-user",
  verifyToken,
  authorizeRole("user"),
  (req, res) => {
    const { First_name, Last_name, Email, Password, Phone, User_Id } = req.body;

    if (!User_Id) {
      console.log("User ID is missing in the request.");
      return res.status(400).json({ Error: "User ID is required." });
    }

    // Prepare SQL query for updating user details
    let sql =
      "UPDATE users SET First_name = ?, Last_name = ?, Phone = ?, Email = ?";
    const values = [First_name, Last_name, Phone, Email];

    // Hash password if provided
    if (Password) {
      const hashedPassword = bcrypt.hashSync(Password, salt);
      sql += ", Password = ?";
      values.push(hashedPassword); // Add hashed password to values
    }

    sql += " WHERE User_Id = ?";
    values.push(User_Id); // Add User_Id to values

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ Error: "Error updating user" });
      }

      if (result.affectedRows > 0) {
        console.log(`User with ID ${User_Id} updated successfully.`);
        return res.json({
          Status: "Success",
          message: "User updated successfully",
        });
      } else {
        console.log(`User with ID ${User_Id} not found.`);
        return res.status(404).json({ Error: "User not found" });
      }
    });
  }
);

// Get all users (admin only)
app.get("/admin/users", verifyToken, authorizeRole("admin"), (req, res) => {
  const query = "SELECT * FROM users"; // Adjust based on your database schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update user role
app.put(
  "/admin/users/:id/role",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const userId = req.params.id;
    const { role } = req.body; // Expecting { role: 'admin' }

    const validRoles = ["admin", "user"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role value" });
    }

    const query = "UPDATE users SET Role = ? WHERE User_Id = ?";

    db.query(query, [role, userId], (err) => {
      if (err) {
        console.error("Error updating user role:", err);
        return res.status(500).json({ error: "Failed to update user role" });
      }

      res.json({ message: "User role updated successfully" });
    });
  }
);

// Update user details
app.put("/admin/users/:id", verifyToken, authorizeRole("admin"), (req, res) => {
  const userId = req.params.id;
  const { First_name, Last_name, Email, Phone } = req.body;

  const query = `
    UPDATE users 
    SET First_name = ?, Last_name = ?, Email = ?, Phone = ?
    WHERE User_Id = ?
  `;

  db.query(query, [First_name, Last_name, Email, Phone, userId], (err) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Failed to update user" });
    }

    res.json({ message: "User updated successfully" });
  });
});

// Delete user
app.delete(
  "/admin/users/:id",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const userId = req.params.id;

    const query = "DELETE FROM users WHERE User_Id = ?";

    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Failed to delete user" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    });
  }
);

// Get all locations (admin only)
app.get("/admin/locations", verifyToken, authorizeRole("admin"), (req, res) => {
  const query = "SELECT * FROM locations"; // Adjust based on your database schema

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update location details
app.put(
  "/admin/locations/:id",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const locationId = req.params.id;
    const { Location_Name, Address, City, Country } = req.body;

    const query = `
    UPDATE locations 
    SET Location_Name = ?, Address = ?, City = ?, Country = ?
    WHERE Location_Id = ?
  `;

    db.query(
      query,
      [Location_Name, Address, City, Country, locationId],
      (err) => {
        if (err) {
          console.error("Error updating location:", err);
          return res.status(500).json({ error: "Failed to update location" });
        }

        res.json({ message: "Location updated successfully" });
      }
    );
  }
);

// Delete location
app.delete(
  "/admin/locations/:id",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    const locationId = req.params.id;

    const query = "DELETE FROM locations WHERE Location_Id = ?";

    db.query(query, [locationId], (err, result) => {
      if (err) {
        console.error("Error deleting location:", err);
        return res.status(500).json({ error: "Failed to delete location" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Location not found" });
      }

      res.json({ message: "Location deleted successfully" });
    });
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

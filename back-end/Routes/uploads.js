const express = require('express');
const upload = require('./middleware/upload'); // Import the multer setup
const db = require('./db');  // Your MySQL connection
const router = express.Router();

// Add a vehicle with image upload
router.post('/add-vehicle', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { make, model, year, color, license_plate, status } = req.body;
        const vehicleImage = req.file ? req.file.filename : null;

        try {
            const [result] = await db.query(
                'INSERT INTO Vehicles (Make, Model, Year, Color, License_Plate, Status, Image_Path) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [make, model, year, color, license_plate, status, vehicleImage]
            );
            res.status(201).json({ message: 'Vehicle added successfully', vehicleId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Error adding vehicle', error });
        }
    });
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('./db');  // Your MySQL connection

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const [userExists] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result] = await db.query('INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        // Return the new user's ID
        res.status(201).json({ message: 'User registered', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

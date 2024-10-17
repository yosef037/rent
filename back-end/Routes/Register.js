import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your secret key

router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (existingUser.length) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        await db.query('INSERT INTO Users (Email, Password, Role) VALUES (?, ?, ?)', [email, hashedPassword, role]);

        // Create a JWT token with the user's role
        const payload = {
            user: {
                email,
                role
            }
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

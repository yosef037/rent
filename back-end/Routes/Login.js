import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (!user.length) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user[0].Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token with the user's role
        const payload = {
            user: {
                id: user[0].User_Id,
                role: user[0].Role // Assuming 'Role' column stores 'admin' or 'user'
            }
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

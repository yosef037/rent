import { Router } from 'express';
import verifyUser from '../Middleware/VerifyUser';
import verifyRole from '../Middleware/VerifyRole';

const router = Router();

// Admin route - only accessible to admins
router.get('/admin-dashboard', verifyUser, verifyRole('admin'), (req, res) => {
  res.send("Welcome to the admin dashboard");
});

// User route - only accessible to users
router.get('/user-dashboard', verifyUser, verifyRole('user'), (req, res) => {
  res.send("Welcome to the user dashboard");
});

// Shared route - accessible to both admin and user
router.get('/shared-page', verifyUser, (req, res) => {
  res.send(`Welcome ${req.user.role} to the shared page`);
});

// some more
// // Protected routes
// router.get('/admin-dashboard', verifyToken, verifyRole('admin'), (req, res) => {
//   res.json({ message: "Welcome to the admin dashboard" });
// });

// router.get('/user-dashboard', verifyToken, verifyRole('user'), (req, res) => {
//   res.json({ message: "Welcome to the user dashboard" });
// });

// // Accessible to both admin and user
// router.get('/profile', verifyToken, (req, res) => {
//   res.json({ message: `Welcome ${req.user.role}, this is your profile page.` });
// });

export default router;

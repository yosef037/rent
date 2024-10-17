import { verify } from 'jsonwebtoken';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;  // Assuming JWT is stored in cookies
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = verify(token, "jwt-secret-key");
    req.user = decoded;  // Attach user data (including role) to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;

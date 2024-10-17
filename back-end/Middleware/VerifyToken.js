import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check for token in cookies or headers
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token verification failed" });
    }
    req.user = decoded; // Attach decoded user data to req
    next();
  });
};

export default verifyToken;

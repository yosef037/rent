const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Access for user denied" });
    }
    next(); // User is authorized, proceed to the next middleware or route handler
  };
};

export default authorizeRole;

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const checkAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check for a specific role
const checkRole = (role) => (req, res, next) => {
  if (req.user?.role === role) {
    next();
  } else {
    res.status(403).json({ message: `${role} access only` });
  }
};

// Exporting the middlewares
module.exports = {
  checkAuth,
  checkRole,
};

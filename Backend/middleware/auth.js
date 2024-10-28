const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach the decoded user (or doctor) data to the request
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

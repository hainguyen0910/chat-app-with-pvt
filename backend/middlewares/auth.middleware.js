const jwt = require('jsonwebtoken');
const status = require('http-status');
const User = require('../models/User');

module.exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(status.FORBIDDEN).json({
      message: 'No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({
      message: 'Unauthorized: Invalid token',
    });
  }
};

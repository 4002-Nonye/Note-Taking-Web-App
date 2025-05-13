const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  
  const token = req.cookies.token;
  if (!token)
    res.status(401).send({
      error: 'No token',
    });

  try {
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      error: 'Invalid or expired token',
    });
  }
};

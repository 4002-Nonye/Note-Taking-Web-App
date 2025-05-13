const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (res, userId) => {
  // Create a JWT for newly registered user
  const token = jwt.sign({ id: userId }, keys.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Send the token to the browser as an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

};

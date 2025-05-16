const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const setAuthCookie = require('../utils/setAuthCookie');

const User = mongoose.model('User');

module.exports = (app) => {
  app.post('/api/register', async (req, res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).send({
        error: 'Invalid email format',
      });
    }
    try {
      // check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if (!existingUser.password) {
          // Check if the user exists but registered via Google only (no password set)
          return res.status(403).send({
            error:
              'This email is already registered via Google. Please log in with Google.',
          });
        }
        // If user exists and already registered with email/password, block duplicate registration
        return res.status(409).send({ error: 'Email already exists' });
      }

      // hash password for security
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // create new user
      const newUser = await new User({
        email,
        password: hashedPassword,
      }).save();

      // Create a JWT token for the newly registered user
      // Send the JWT token as an HTTP-only cookie
      setAuthCookie(res, newUser._id);

      res.status(201).send({ message: 'User successfully registered' });
    } catch (err) {
      res.status(500).send({ error: 'Server error during registration' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    //Basic validation
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and Password are required' });
    }

    try {
      const existingUser = await User.findOne({ email });

      // If there is no user, do not log in
      if (!existingUser) {
        return res.status(404).send({
          error: 'User does not exist! Create an account to continue',
        });
      }

      // If user exists but has no password (e.g., registered via Google)
      if (!existingUser.password) {
        return res.status(403).send({
          error:
            'This account was registered via Google. Please log in with Google.',
        });
      }

      // compare password to allow login if there is a user
      const comparePassword = bcrypt.compareSync(
        password,
        existingUser.password
      );

      // if passwords do not match
      if (!comparePassword) {
        return res.status(401).send({ error: 'Invalid Credentials' });
      }

      // if passwords match
      setAuthCookie(res, existingUser._id);
      res.status(200).send({ message: 'Successfully logged in' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
};

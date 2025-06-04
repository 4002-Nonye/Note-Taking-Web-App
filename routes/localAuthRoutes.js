const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const setAuthCookie = require('../utils/setAuthCookie');
const requireLogin = require('../middlewares/requireLogin');
const sanitizeUser = require('../utils/sanitizeUser');

const User = mongoose.model('User');

module.exports = (app) => {
  // sign up a new user
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
      const existingUser = await User.findOne({ email }).select(
        '-_user -__v -updatedAt'
      );

      if (existingUser) {
        return res.status(409).send({ error: 'Email already exists' });
      }

      // Check if the user exists but registered via Google only (no password set)
      if (existingUser && !existingUser.password) {
        return res.status(403).send({
          error:
            'This email is already registered via Google. Please log in with Google.',
        });
      }

      // hash password for security
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const newUser = await new User({
        email,
        password: hashedPassword,
      }).save();

      // Create a JWT token for the newly registered user
      // Send the JWT token as an HTTP-only cookie
      setAuthCookie(res, newUser._id);

      // Destructure the user object to remove sensitive or unnecessary fields before sending to the client
      const safeUser = sanitizeUser(newUser);
      res.status(201).send({
        message: 'User successfully registered',
        data: safeUser,
      });
    } catch (err) {
      res.status(500).send({ error: 'Server error during registration' });
    }
  });

  // login existing user
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
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      // if passwords do not match
      if (!comparePassword) {
        return res.status(401).send({ error: 'Invalid Credentials' });
      }

      // if passwords match
      setAuthCookie(res, existingUser._id);

      // Destructure the user object to remove sensitive or unnecessary fields before sending to the client
      const safeUser = sanitizeUser(existingUser._doc);
      res
        .status(200)
        .send({ message: 'Successfully logged in', data: safeUser });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // change password
  app.put('/api/account/passwordchange', requireLogin, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
      const existingUser = await User.findById(req.user.id);

      // user signed up using google therefore can't change password because he doesn't have one
      if (!existingUser.password) {
        return res.status(400).send({
          error: 'Password change not available for Google sign-in accounts.',
        });
      }

      // check if current password matches existing password in db
      const comparePassword = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );

      // current password does not match existing password
      if (!comparePassword) {
        return res.status(401).send({ error: 'Incorrect current password' });
      }

      // proceed to change the password if they match
      // hash new password for security
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      existingUser.password = hashedPassword;

      await existingUser.save();
      res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update password' });
    }
  });
};

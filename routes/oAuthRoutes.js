
const requireLogin = require('../middlewares/requireLogin');
const passport = require('passport');
const setAuthCookie = require('../utils/setAuthCookie');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),

    (req, res) => {
      
      // Create a JWT token for the newly registered user
      // Send the JWT token as an HTTP-only cookie
      setAuthCookie(res, req.user.id);
      res.redirect('/notes');
    }
  );

  app.get('/api/current-user',requireLogin, (req, res) => {
    
    res.send(req.user);
    
  });

  app.get('/api/logout', (_, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'Lax',
    });
    res.send({ message: 'Logged out successfully' });
  });
};

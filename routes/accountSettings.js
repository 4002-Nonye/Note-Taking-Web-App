const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

require('../models/User');

const Users = mongoose.model('User'); // fetch user

module.exports = (app) => {
  app.put('/api/account/settings', requireLogin, async (req, res) => {
    try {
      const { fontTheme, colorTheme } = req.body;
      const updates = {};
      if (fontTheme) updates['settings.fontTheme'] = fontTheme;
      if (colorTheme) updates['settings.colorTheme'] = colorTheme;
      const updatedSettings = await Users.findByIdAndUpdate(
        req.user.id,
        {
          // We’re only updating the settings the user changed (like fontTheme or colorTheme)
          // This makes sure if they change just one setting, the rest stay the same
          $set: updates,
        },
        { new: true }
      );
      // could not find a user with the id passed
      if (!updatedSettings) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.status(200).send({ message: 'Settings updated successfully' });
    } catch (err) {
      console.error('Error updating settings:', err); // 👈 Add this
      res.status(500).send({ error: 'Failed to update settings' });
    }
  });
};

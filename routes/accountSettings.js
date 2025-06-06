const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const sanitizeUser = require('../utils/sanitizeUser');

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
      const newSettings = sanitizeUser(updatedSettings._doc);
      res.status(200).send({
        message: 'Settings updated successfully',
        data: newSettings.settings,
      });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update settings' });
    }
  });

  app.get('/api/account/settings',requireLogin, async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('settings');

      if (!user) return res.status(404).send({ error: 'User not found' });

      res.status(200).send({
        message: 'Settings fetched successfully',
        data: user.settings,
      });
    } catch (err) {
      res.status(500).send({ error: 'Failed to fetch settings' });
    }
  });
};

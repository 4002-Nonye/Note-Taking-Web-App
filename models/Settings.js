const mongoose = require('mongoose');
const { Schema } = mongoose;

// A user account settings
const settingsSchema = new Schema({
  fontTheme: { type: String, default: 'sans-serif' },
  colorTheme: { type: String, default: 'light' },
});

module.exports = settingsSchema;

const mongoose = require('mongoose');
const { Schema } = mongoose;

// properties we want our users to have
const userSchema = new Schema(
  {
    googleID: String,
    email: { type: String, lowercase: true, unique: true, trim: true },
    password: String,
  },
  { timestamps: true }
);

// To create a collection of users (Table of users)
mongoose.model('User', userSchema); // two arguments means we are trying to create a collection

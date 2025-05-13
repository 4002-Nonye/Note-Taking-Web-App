const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport')

mongoose.connect(keys.mongoURI);


const app = express();

// to parse data to req.body
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

require('./routes/oAuthRoutes')(app);
require('./routes/localAuthRoutes')(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT);

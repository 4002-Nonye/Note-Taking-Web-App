const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
const path = require('path');

mongoose.connect(keys.mongoURI);

const app = express();

// to parse data to req.body
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

require('./routes/oAuthRoutes')(app);
require('./routes/localAuthRoutes')(app);





// HANDLING ROUTES IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets like main.js or main.css
  app.use(express.static(path.join(__dirname,'/client/dist')));


  app.get('*', (_, res) =>
    res.sendFile(path.join(__dirname, '/client', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 8000;

app.listen(PORT);

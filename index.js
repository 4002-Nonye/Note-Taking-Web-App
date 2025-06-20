const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
const path = require('path');

mongoose.connect(keys.mongoURI);

const app = express();


// Enable proxy trust (important for rate limiting behind Render)
app.set('trust proxy', 1);


// to parse data to req.body
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

require('./routes/oAuthRoutes')(app);
require('./routes/localAuthRoutes')(app);
require('./routes/noteRoutes')(app);
require('./routes/accountSettings')(app);
require('./routes/geminiAIRoutes')(app);

// HANDLING ROUTES IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets like main.js or main.css
  app.use(express.static(path.join(__dirname, 'client/dist')));

  //express will serve up index.html when it does not recognize a route
  app.get('/{*any}', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT);

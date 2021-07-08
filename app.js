// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
const helpers = require("handlebars-helpers");
hbs.registerHelper(helpers());

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);
const session = require("express-session");
const mongoStore = require("connect-mongo");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,  // -> for security reasons we fetch the info from the .env file because the .env file never gets pushed to github
    cookie: {
      sameSite: true,  // -> the front-end and back-end both run on the localhost
      httpOnly: true,  // -> since we are not using https we need to set this - https requires a certificate
      maxAge: 600000,  // -> session time -> 60000ms = 1 hour
    },
    rolling: true,     // -> this is to not be logged out if you're using the page
    store: new mongoStore({   // -> This is not related to the session since the session is control by the cokie so we set a ttl (time to leave)
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60*60*24   // -> this is saying that after a day the session will be terminated
    })
  })
);

function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
    app.locals.loggedInUser = req.session.currentUser.username;
  }else{
    app.locals.loggedInUser = "";
  }
  next();
}

app.use(getCurrentLoggedUser);

// default value for title local
const projectName = 'market-place';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const classes = require("./routes/classes");
app.use("/", classes);

const teachers = require("./routes/teachers");
app.use("/", teachers);

const search = require("./routes/search");
app.use("/", search);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

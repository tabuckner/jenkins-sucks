var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helpers = require('./util/helpers');

/**
 * Routers
 */
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

/**
 * App
 */
var app = express();

/**
 * Rate Limiter
 * 
 * Allows one request per 5 minutes per IP.
 * Read More: https://www.npmjs.com/package/express-rate-limit
 */
const limiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 1,
  message: { message: 'Too many requests have been sent. Try again in a few minutes.' }
});

/**
 * Config
 */
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;

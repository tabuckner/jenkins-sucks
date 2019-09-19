const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helpers = require('./util/helpers');
const jenkinsTokenMiddleware = require('./middleware/jenkins-token.middleware');
const devModeChokeMiddleware = require('./middleware/dev-mode-choke.middleware');

/**
 * Routers
 */
const mainRouter = require('./routes/main.router');
const genericJobRouter = require('./routes/generic-job.router');

/**
 * App
 */
const app = express();

/**
 * Rate Limiters
 * 
 * Read More: https://www.npmjs.com/package/express-rate-limit
 */
const genericJobRateLimiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 1,
  message: { message: 'Too many requests have been sent. Try again in a few minutes.' }
});
const mainRouteRateLimiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 5,
  message: { message: 'Too many requests have been sent. Try again in a few minutes.' }
});

/**
 * Middlewares
 */
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
app.use(jenkinsTokenMiddleware);
app.use(devModeChokeMiddleware);

/**
 * Configs
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Router Setup
 */
app.use('/', mainRouteRateLimiter, mainRouter);
app.use('/generic-job', genericJobRateLimiter, genericJobRouter);

module.exports = app;

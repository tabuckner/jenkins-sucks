const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helpers = require('./util/helpers');
const jenkinsTokenMiddleware = require('./middleware/jenkins-token.middleware');
const devModeChokeMiddleware = require('./middleware/dev-mode-choke.middleware');
const devLogMiddleware = require('./middleware/dev-log.middleware');

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
  message: 'Woah there, calm down bro-town. Take five and hit me again...'
});
const mainRouteRateLimiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 5,
  message: 'Woah there, calm down bro-town. Take five and hit me again...'
});

/**
 * Configs
 */
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Custom Middlewares
 */
app.use(jenkinsTokenMiddleware);
app.use(devModeChokeMiddleware);
app.use(devLogMiddleware);

/**
 * Router Setup
 */
app.use('/', mainRouteRateLimiter, mainRouter);
app.use('/generic-job', genericJobRateLimiter, genericJobRouter);
app.use('/vendor', express.static(__dirname + '/node_modules'))

module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helpers = require('./util/helpers');
const debugLogger = require('./util/logger');
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
 * Configs
 */
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Rate Limiters
 * 
 * Read More: https://www.npmjs.com/package/express-rate-limit
 */
app.set('trust proxy', 1);
const genericJobRateLimiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 2,
  message: 'Woah there, calm down bro-town. Take five and hit me again...',
  keyGenerator: (req) => {
    const requestBody = req && req.body;
    const commandsUsed = requestBody && req.body.text && req.body.text.length > 0;
    const slackUserName = requestBody && req.body.user_name;
    const slackUserId = requestBody && req.body.user_id;

    if (slackUserName || slackUserId) {
      debugLogger.log(`Slack User Name ${slackUserName}, Slack User ID: ${slackUserId}`)
      const uniqueId = req.body.user_id || req.body.user_name;
      debugLogger.log(`Using ${uniqueId} as 'uniqueId'`);
      return uniqueId;
    }

    if (!commandsUsed) {
      debugLogger.log(`Using ${req.ip} as 'uniqueId`)
      return req.ip;
    }

    const uniqueId = req.body.text.split(' ')[0]
    debugLogger.log(`Using ${uniqueId} as 'uniqueId`)
    return uniqueId;
  }
});
const mainRouteRateLimiter = rateLimit({
  windowMs: helpers.minutesToMilliseconds(5),
  max: 5,
  message: 'Woah there, calm down bro-town. Take five and hit me again...'
});

/**
 * Custom Middlewares
 */
app.use(jenkinsTokenMiddleware);
app.use(devLogMiddleware);
app.use(devModeChokeMiddleware);

/**
 * Router Setup
 */
app.use('/', mainRouteRateLimiter, mainRouter);
app.use('/generic-job/', genericJobRateLimiter, genericJobRouter);
app.use('/vendor', express.static(__dirname + '/node_modules'))

module.exports = app;

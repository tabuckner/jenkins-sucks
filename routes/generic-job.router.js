const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const urlBuilder = require('../util/helpers').buildJenkinsScanUrl;

/**
 * Generic Endpoint
 * 
 * Instead of managing a map of jobs -> endpoints, just allow the user to pass it in.
 */
router.get('/', function(req, res, next) {
  res.send('Please provide a Jenkins Job, (e.g. generic-job/MY_JOB).');
});

/**
 * POST to Generic Route Job in Payload.
 */
router.post('/:orgBaseUrl', function(req, res, next) {
  const { orgBaseUrl } = req.params;
  const text = req.body.text;
  
  if (!text) {
    return res.statusCode(500).send('You gotta give me something to work with here! What\'s the Jenkins Job?')
  }

  const commands = text.split(' ');
  const jenkinsJobName = commands[0];
  const url = urlBuilder(orgBaseUrl, jenkinsJobName);

  const message = commands.length > 1 ? `I agree, ${jenkinsJobName} rilly do be ${commands.slice(1).join(' ')}.` : 'Message Relayed';

  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': res.get('Authorization') }
  }).then((response) => {
    return res.status(200).send(message);
  });
});

/**
 * GET to Generic Job Route.
 */
router.get('/:orgBaseUrl/:jenkinsJob', function(req, res, next) {
  const { orgBaseUrl, jenkinsJob } = req.params;
  const url = urlBuilder(orgBaseUrl, jenkinsJob);
  const message = 'Message Relayed.';

  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': res.get('Authorization') }
  }).then((response) => {
    return res.status(200).send(message);
  });
});

/**
 * POST to Generic Job route.
 */
router.post('/:orgBaseUrl/:jenkinsJob', function(req, res, next) {
  const { orgBaseUrl, jenkinsJob } = req.params;
  const url = urlBuilder(orgBaseUrl, jenkinsJob);
  const message = 'Message Relayed.';
  
  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': res.get('Authorization') }
  }).then((response) => {
    return res.status(200).send(message);
  });
});

module.exports = router;

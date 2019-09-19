var express = require('express');
var router = express.Router();
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
 * GET to Generic Job Route.
 */
router.get('/:orgBaseUrl/:jenkinsJob', function(req, res, next) {
  const { orgBaseUrl, jenkinsJob } = req.params;
  const url = urlBuilder(orgBaseUrl, jenkinsJob);

  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': res.get('Authorization') }
  }).then((response) => {
    return res.status(200).send({
      message: 'Message Relayed.',
      jenkinsResponse: response
    });
  });
});

/**
 * POST to Generic Job route.
 */
router.post('/:jenkinsJob', function(req, res, next) {
  const { jenkinsJob } = req.params;
  const url = urlBuilder(jenkinsJob);

  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': res.get('Authorization') }
  }).then((response) => {
    return res.status(200).send({
      message: 'Message Relayed.',
      jenkinsResponse: response
    });
  });
});

module.exports = router;

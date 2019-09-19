const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// const endpoints = require('../constants/jenkins-endpoints').JENKINS_ENDPOINTS;
const JENKINS_ENDPOINTS = require('../constants/jenkins-endpoints');
const JENKINS_TOKEN = process.env.JENKINS_TOKEN

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  if (!JENKINS_ENDPOINTS) {
    return res.status(500).send({
      message: '`endpoints` is not defined.'
    });
  }

  if (!JENKINS_TOKEN ) {
    return res.status(500).send({
      message: '`JENKINS_TOKEN` is not defined.'
    });
  }

  return res.send({ message: 'success' });
  
  fetch(JENKINS_ENDPOINTS.daticalService, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${JENKINS_TOKEN}` }
  }).then((response) => {
    return res.status(200).send({
      message: 'Request Successful',
      jenkinsResponse: response
    });
  });
});

module.exports = router;

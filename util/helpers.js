const logger = require('./logger');

/**
 * Returns number of minutes in milliseconds.
 * 
 * @param {Number} number number of minutes
 */
const minutesToMilliseconds = (number) => {
  return number * 60 * 1000;
}

/**
 * Given a valid Jenkins Job Name, will return the URL that on a successful `POST` request,
 * will force Jenkins to scan for new changes.
 * 
 * @param {String} orgBaseUrl the name of the Jenkins instance Base Url (e.g. jenkins.company.com:port).
 * @param {String} jobName the name of the job as listed in Jenkins you wish to refresh.
 */
const buildJenkinsScanUrl = (orgBaseUrl, jobName) => {
  logger.log({orgBaseUrl, jobName});
  if (!orgBaseUrl) {
    throw new Error('Base URL not defined');
  }
  if (!jobName) {
    throw new Error('Job name not defined');
  }

  const baseUrl = `http://${orgBaseUrl}/job`;
  const scanQueryParams = 'build?delay=0';
  return `${baseUrl}/${jobName}/${scanQueryParams}`;
}



module.exports = {
  minutesToMilliseconds,
  buildJenkinsScanUrl,
}

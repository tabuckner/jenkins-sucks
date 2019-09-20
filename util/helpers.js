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
  logger.log('Jenkins Url to be Used.', {orgBaseUrl, jobName});
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

const appInDevMode = () => {
  const DEV_MODE = process.env.DEV_MODE || process.env.DEV;
  return DEV_MODE === true || DEV_MODE && DEV_MODE.length > 0 && DEV_MODE.toLowerCase() === 'true';
}

module.exports = {
  minutesToMilliseconds,
  buildJenkinsScanUrl,
  appInDevMode
}

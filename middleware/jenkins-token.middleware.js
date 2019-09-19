const jenkinsTokenMiddleware = (req, res, next) => {
  const JENKINS_TOKEN = process.env.JENKINS_TOKEN;
  if (!JENKINS_TOKEN) {
    return res.status(500).send({
      message: '`JSON_TOKEN` not defined.'
    });
  }
  res.set('Authorization', `Basic ${JENKINS_TOKEN}`);
  next();
}

module.exports = jenkinsTokenMiddleware;

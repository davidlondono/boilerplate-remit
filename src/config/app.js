const prefix = require('./environment');

module.exports = {
  app: process.env[`${prefix}APP_NAME`],
  service: process.env[`${prefix}SERVICE_NAME`],
};

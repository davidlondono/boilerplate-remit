const prefix = require('./environment');

module.exports = {
  url: process.env[`${prefix}AMQP_URL`],
  name: process.env[`${prefix}AMQP_NAME`],
  exchange: process.env[`${prefix}AMQP_EXCHANGE`],
};

global.Promise = require('bluebird');
const logger = require('./logger');
const server = require('./server');


server.start().then(() => {
  logger.info('server started');
}).catch((err) => {
  logger.error('start error', err);
});

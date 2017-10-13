const remit = require('remit');
const Commands = require('./endpoints');
const logger = require('./logger');
const remitConfig = require('./config/remit');

const start = async () => {

  // create listener
  const listener = remit(remitConfig);
  Commands.start(listener);
  return listener;
};
module.exports = { start };

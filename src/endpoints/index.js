// @flow
const _ = require('lodash');
const logger = require('../logger');
const handlers = require('./handlers');
const appConfig = require('../config/app');
const BusinessError = require('../BusinessError');

const { app: appName, service: serviceName } = appConfig;
// handle business errors
const errorHandler = (err) => {
  if (err.business === true || err instanceof BusinessError) {
    return { error: err.message, ok: false };
  }
  throw err;
};

const parseString = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `.${y.toLowerCase()}`);
const handlerAdder = remit => (item) => {
  const containsTwoPoints = item.pattern.includes(':');
  if (containsTwoPoints) {
    throw new Error(`endpoint ${item.pattern} can't have character ':'`);
  }
  const endpointName = parseString(item.pattern);
  const queueName = `${appName}.${serviceName}.${endpointName}`;
  if (!appName) {
    throw new Error('missing enviroment APP_NAME');
  }
  if (!serviceName) {
    throw new Error('missing enviroment SERVICE_NAME');
  }
  logger.trace(`add handler for${item.pattern} with name ${endpointName}`);
  return remit
    .endpoint(queueName)
    .handler(async (event) => {
      try {
        return await item.handler(event);
      } catch (err) {
        return errorHandler(err);
      }
    })
    .start();
};

const start = remit => _.map(handlers, handlerAdder(remit));

module.exports = { start };

// @flow
const _ = require('lodash');
const logger = require('../logger');
const handlers = require('./handlers');
const appConfig = require('../config/app');
const BusinessError = require('../BusinessError');

const { app: appName, service: serviceApp } = appConfig;
// handle business errors
const errorHandler = (err) => {
  if (err.business === true || err instanceof BusinessError) {
    return { error: err.message, ok: false };
  }
  throw err;
};

const parseString = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `.${y.toLowerCase()}`);

const handlerAdder = remit => (item) => {
  const { pattern, service: itemService } = item;
  const containsTwoPoints = pattern.includes(':');
  if (containsTwoPoints) {
    throw new Error(`endpoint ${pattern} can't have character ':'`);
  }
  const endpointName = parseString(pattern);
  const serviceName = itemService || serviceApp;
  if (!appName) {
    throw new Error('missing enviroment APP_NAME');
  }
  if (!serviceName) {
    throw new Error('missing enviroment SERVICE_NAME');
  }
  const queueName = `${appName}.${serviceName}.${endpointName}`;
  logger.trace(`add handler for ${pattern} with name ${queueName}`);
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

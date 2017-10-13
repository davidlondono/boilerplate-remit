// @flow
const _ = require('lodash');
const logger = require('../logger');
const handlers = require('./handlers');
const BusinessError = require('../BusinessError')

  // handle business errors
const errorHandler = (err) => {
  if (err.business === true || err instanceof BusinessError) {
    return { error: err.message, ok: false };
  }
  throw err;
};

const handlerAdder = remit => (item) => {
  logger.trace('add handler for', item.pattern);
  const containsTwoPoints = item.pattern.includes(':');
  if (containsTwoPoints) {
    throw new Error(`endpoint ${feature} of Service ${name} can't have character ':'`)
  }
  return remit
    .endpoint(item.pattern)
    .handler(async (event) => {
      try {
        return await item.handler(event)
      } catch (err) {
        return errorHandler(err)
      }
    })
    .start();
};

const start = (remit) => _.map(handlers, handlerAdder(remit));

module.exports = { start };

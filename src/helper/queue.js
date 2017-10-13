const logger = require('../logger');
const BusinessError = require('../BusinessError');
const appConfig = require('../config/app');

const { app: appName, service: serviceOwnName } = appConfig;


const parseString = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `.${y.toLowerCase()}`);

module.exports = remit => ({ serviceName, interfaceMethod, options }) => async (msg) => {
  const endpoint = parseString(interfaceMethod)
  const queueName = `${appName}.${serviceName || serviceOwnName}.${endpoint}`;
  logger.trace('Publish on interface', queueName, 'with data', msg);
  const response = await remit.request(queueName)
    .options(options)
    .send(msg);
  const { data, error, ok } = response;
  if (!ok) {
    throw new BusinessError(error);
  }
  return data;
};

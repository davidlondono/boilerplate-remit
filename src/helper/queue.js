const logger = require('../logger');
const BusinessError = require('../BusinessError');
const appConfig = require('../config/app');

const { app: appName, service: serviceOwnName } = appConfig;

const parseString = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `.${y.toLowerCase()}`);

const queue = ({ serviceName, interfaceMethod, client, options = {} }) => {
  const endpoint = parseString(interfaceMethod);
  const queueName = `${appName}.${serviceName || serviceOwnName}.${endpoint}`;
  const run = client.request(queueName).options(options);

  return async (msg) => {
    logger.trace('Publish on interface', queueName, 'with data', msg);
    const response = await run(msg);
    const { data, error, ok } = response;
    if (!ok) {
      throw new BusinessError(error);
    }
    return data;
  };
};

module.exports = queue;

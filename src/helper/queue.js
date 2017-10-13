const logger = require('../logger');
const BusinessError = require('../BusinessError')


module.exports = remit => ({ topic }) => async (msg) => {
  logger.trace('Publish on interface', queue, 'with data', msg);
  
  const response = await remit.request(topic).options({
    event
  }).send(msg);
  const { data, error, ok } = response;
  if (!ok) {
    throw new BusinessError(error);
  };
};

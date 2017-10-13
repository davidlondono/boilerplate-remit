const _ = require('lodash');
const remit = require('remit');
const logger = require('../logger');
const REMIT_CONFIG = require('../config/remit');
const services = require('../config/services');
const queueFactory = require('../helper/queue');


const start = () => _.reduce(services, (publisher, service) => {
  // use AMQP config globla
  const remitConfig = _.clone(REMIT_CONFIG);

  // custom config with service parameters
  const { endpoints, alias, options } = service;

  // seneca client using service config
  const client = remit(_.assign(remitConfig, options));

  // create queue manager with this seneca
  const queue = queueFactory(client);

  // create the commands using the queue of each pin
  _.each(endpoints, (topic) => {
    const containsTwoPoints = feature.includes(':');
    if (containsTwoPoints) {
      throw new Error(`topic ${topic} can't have character ':'`)
    }
    const [interfaz, nameFeature] = _.split(feature, '.');
    if (!nameFeature || !interfaz) {
      throw new Error(`topic ${feature} dont match '<service>.<interfaz>.<method>'`);
    }
    const pathInterfaz = `${interfaz || alias}.${nameFeature}`
    const existsQueue = _.has(publisher, pathInterfaz);
    if (existsQueue) {
      throw new Error(`interface ${pathInterfaz} already exist on publisher, add an alias insted`);
    }
    // add queue of a pin
    return _.set(publisher, pathInterfaz, queue({ topic }));
  });
  // add commands on to the service name
  return publisher;
}, {});

module.exports = start();

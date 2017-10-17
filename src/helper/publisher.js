const _ = require('lodash');
const remit = require('remit');
const REMIT_CONFIG = require('../config/remit');
const services = require('../config/services');
const appConfig = require('../config/app');
// const queueFactory = require('../helper/queue');
const request = require('../helper/request');

const { service: serviceOwnName } = appConfig;

const start = () => _.reduce(services, (publisher, service) => {
  // use AMQP config globla
  const remitConfig = _.clone(REMIT_CONFIG);

  // custom config with service parameters
  const {
    service: serviceName, endpoints, alias, options,
  } = service;

  if (!endpoints) {
    throw new Error(`no "endpoints" found on ${service}`);
  }
  // seneca client using service config
  const client = remit(_.assign(remitConfig, options));

  // create queue manager with remit
  // const queue = queueFactory(client);

  // create the commands using the queue of each pin
  const commands = _.reduce(endpoints, (t, interfaceMethod) => {
    const containsTwoPoints = interfaceMethod.includes(':');
    if (containsTwoPoints) {
      throw new Error(`topic ${interfaceMethod} can't have character ':'`);
    }
    const existsQueue = _.has(t, interfaceMethod);
    if (existsQueue) {
      throw new Error(`interfaceMethod ${interfaceMethod} already exist on service ${serviceName}`);
    }
    // add queue of a pin
    return _.set(t, interfaceMethod, request({ serviceName, interfaceMethod, client, options }));
  }, {});
  // add commands on to the service name
  publisher[serviceName || alias || serviceOwnName] = commands;
  return publisher;
}, {});

module.exports = start();

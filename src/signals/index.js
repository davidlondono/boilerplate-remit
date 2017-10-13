const _ = require('lodash');
const terminate = require('./terminate');

const singals = {
  SIGTERM: terminate,
};

_.forEach(singals, (value, key) => {
  process.on(key, value());
});


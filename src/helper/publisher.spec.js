const test = require('ava');
const { proxy } = require('proxyrequire');

const services = [
  {
    name: 'mockService',
    pin: ['cmd:mockAction'],
  },
  {
    name: 'Service',
    pin: ['cmd:one', 'cmd:tow'],
  },
];
const senecaStub = {
  use: () => senecaStub,
  client: () => 'clientSeneca',
};


test((t) => {
  const publisher = proxy(() => require('./publisher'), {
    '../config/services': services,
    '../helper/queue': () => feature => `queueCreated:${feature}`,
    seneca: () => senecaStub,
  });
  t.deepEqual(publisher, {
    mockService: {
      mockAction: 'queueCreated:cmd:mockAction',
    },
    Service: {
      one: 'queueCreated:cmd:one',
      tow: 'queueCreated:cmd:tow',
    },
  });
});

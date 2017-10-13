const { MathInterface } = require('../interfaces');

const handlers = [
  {
    pattern: 'sum',
    handler: (msg) => {
      const { a, b } = msg.data;
      return MathInterface.sum(a, b);
    },
  },
  {
    pattern: 'sumInternal',
    handler: async (msg) => {
      const { a, b } = msg.data;
      return MathInterface.sumInternal(a, b);
    },
  },
  {
    pattern: 'times',
    handler: async (msg) => {
      const { a, b } = msg.data;
      return MathInterface.pow(a, b);
    },
  },
  {
    pattern: 'error',
    handler: async (msg) => {
      return MathInterface.errorServer();
    },
  },
  {
    pattern: 'bussinesError',
    handler: async (msg) => {
      return MathInterface.bussinessError();
    },
  },
];

module.exports = handlers;

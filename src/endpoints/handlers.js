const { MathInterface } = require('../interfaces');

const handlers = [
  {
    pattern: 'math.sum',
    handler: (msg) => {
      const { a, b } = msg.data;
      return MathInterface.sum(a, b);
    },
  },
  {
    pattern: 'math.sumInternal',
    handler: async (msg) => {
      const { a, b } = msg.data;
      return MathInterface.sumInternal(a, b);
    },
  },
  {
    pattern: 'math.times',
    handler: async (msg) => {
      const { a, b } = msg.data;
      return MathInterface.pow(a, b);
    },
  },
  {
    pattern: 'math.error',
    handler: async (msg) => {
      return MathInterface.errorServer();
    },
  },
  {
    pattern: 'math.bussinesError',
    handler: async (msg) => {
      return MathInterface.bussinessError();
    },
  },
];

module.exports = handlers;

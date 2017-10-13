module.exports = [
  {
    service: 'math',
    endpoints: ['sum', 'sumInternal'],
    options: {
      timeout: 5000,
    },
  },
];

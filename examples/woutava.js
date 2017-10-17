const logger = require('../src/logger');
// const remitConfig = require('../src/config/remit');
const server = require('../src/server');
// const remit = require('remit');
const publisher = require('../src/helper/publisher');

// const listener = remit(remitConfig);

server.start();

const randomInt = (min = 1, max = 10) => Math.floor(Math.random() * max) + min;

// Predefine request
// const sum = listener.request('math.math.sum');

async function foo() {
  for (let i = 1; i < 10000; i += 1) {
    // 10K requests
    // Result without predefine request: 19722.188ms
    // ex: const result = await listener.request('math.math.sum')({ a: 1, b: 5 });
    // Result with predefine request: 7508.390ms
    // const result = await sum({ a: randomInt(), b: randomInt() });
    // Result with publisher: 20401.779ms
    // Result with NEW publisher: 7585.385ms
    const result = await publisher.math.sum({ a: randomInt(), b: randomInt() });
    // If LOG_LEVEL=trace the response is equal x2: 14382.916ms
    logger.trace('Result #', i, '=', result);
  }
}

console.time('Running bar');
foo().then(() => {
  console.timeEnd('Running bar');
  process.exit();
}).catch(err => console.log(err));

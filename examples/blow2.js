const remitConfig = require('../src/config/remit');
const publisher = require('../src/helper/publisher')
const remit = require('remit');

const interval = 300;
let counter = 0;
let startTime = Date.now();

const repeatBench = (times, callback) => Promise.all(new Array(times).map(callback));


const elementsAtTime = 1;

setInterval(() => {
  try {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of line

    const nowTime = Date.now();
    const difference = nowTime - startTime;
    const speed = 1000 * (counter / difference);
    process.stdout.write(`speed ${speed} request/s`);
    counter = 0;
    startTime = nowTime;
  } catch (e) {
    console.error(e);
  }
}, interval);
setTimeout(async () => {
  for (var i = 0; i<100000; i++) {
    const m = await repeatBench(elementsAtTime, () => publisher.math.sum({ a: 1, b: 1 }));
    // console.log(m);
    counter += elementsAtTime;
  };
}, 0);

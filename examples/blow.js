const remitConfig = require('../src/config/remit');
const publisher = require('../src/helper/publisher')
const remit = require('remit');


const listener = remit(remitConfig);

console.log(publisher);
let counter = 0;
let startTime = Date.now();
const timeCounter = 1;
const repeatBench = (times, callback) => Promise.all(new Array(times).map(callback));
const getSum = () => repeatBench(timeCounter, publisher.math.sumInternal({ a: 1, b: 1 }));
const count = (a) => {
  counter += 1;
  return a;
};

const interval = 300;
setInterval(() => {
  process.stdout.clearLine();  // clear current text
  process.stdout.cursorTo(0);  // move cursor to beginning of line

  const nowTime = Date.now();
  const difference = nowTime - startTime;
  const speed = 1000 * (counter / difference);
  process.stdout.write(`speed ${speed} request/s`);
  counter = 0;
  startTime = nowTime;
}, interval);

const recursive = () => getSum(0).then(count).then(recursive);

// getSum().then((h) => console.log(h))
recursive().catch((err) => {
    console.error(err);
    process.exit(0);
});

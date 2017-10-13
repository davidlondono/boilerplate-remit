const remitConfig = require('./config/remit');
const server = require('./server');
const remit = require('remit');
const Promise = require('bluebird');
const test = require('ava');


const listener = remit(remitConfig);

const repeatBench = (name, times, callback) => {
  console.time(name);
  return Promise.map(new Array(times), callback)
    .then((o) => {
      console.timeEnd(name);
      return o;
    }, { concurrency: 50 });
};


test.before(() => server.start());

test('make a sum', async (t) => {
  const msg = await listener.request('math.sum').send({ a:1, b: 5})

  const { data } = msg;
  t.is(data, 6);
});


test('make benchmark internal sum', async (t) => {
  // t.plan(1);
  await repeatBench('double sum', 10000, () => listener.request('math.sum').send({ a:1, b: 5}));
  t.pass();
});

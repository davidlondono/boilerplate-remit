
const Math = require('./Math');
const test = require('ava');

test((t) => {
  const { data } = Math.sum(1, 2);
  t.is(data, 3);
});

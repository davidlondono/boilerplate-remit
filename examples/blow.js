const remitConfig = require('../src/config/remit');
const server = require('../src/server');
const remit = require('remit');


const listener = remit(remitConfig);

const getSum = () => {
    return listener.request('math.sum').send({ a: 1, b: 1 })
}
const recursive = () => {
    return getSum().then(recursive);
}
recursive().catch((err) => {
    console.error(err);
    process.exit(0);
})
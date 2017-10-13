const dotenv = require('dotenv');

let environment;
let path;
const env = '.env';

switch (process.env.NODE_ENV) {
  case 'develop':
    environment = 'DEV_';
    path = `${env}`;
    break;
  case 'production':
    environment = '';
    path = `${env}`;
    break;
  default:
    environment = '';
    path = '.env.test';
    break;
}
dotenv.config({ path });
const prefix = environment;
module.exports = prefix;

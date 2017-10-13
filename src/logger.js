const pino = require('pino');
const fs = require('fs');

const logger = pino(fs.createWriteStream('service.log', { flags: 'a' }));

if (process.env.LOG_LEVEL) logger.level = process.env.LOG_LEVEL;

module.exports = logger;

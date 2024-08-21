const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: 'logs.log',
    }),
  ],
});

module.exports = logger;

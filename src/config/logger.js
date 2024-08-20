const winston = require('winston');

const logger = winston.createLogger({
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
    // new winston.transports.File({
    //   filename: 'logs.log',
    // }),
  ],
});

module.exports = logger;

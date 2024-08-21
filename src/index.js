const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./config/logger');
const config = require('./config/config');

// connect to mongodb
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');

  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const mongoose = require("mongoose");
const app = require("./app");
const logger = require('./config/logger');

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// console.log("port is ", PORT, "url is", MONGODB_URL);

// user mongodb options here
mongoose.connect(MONGODB_URL).then(() => {
  logger.info("Connected to MongoDB");

  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});

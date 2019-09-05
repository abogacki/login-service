const mongoose = require('mongoose');
const {
  // MONGO_USERNAME,
  // MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const options = {
  newUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const makeConnect = (url, options) => () => {
  mongoose
    .connect(url, options)
    .then(arg => {
      console.log('mongoDB is connected');
    })
    .catch(err => console.error(err));
};

const connect = makeConnect(url, options);

module.exports = { connect };

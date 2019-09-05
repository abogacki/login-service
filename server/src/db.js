const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const DB_CONTAINER_NAME = 'database';
const DB_CONTAINER_PORT = '27017';
const DB_NAME = 'api';
const url = `mongodb://${DB_CONTAINER_NAME}:${DB_CONTAINER_PORT}/${DB_NAME}`;

const options = {
  newUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const connect = () => {
  mongoose
    .connect(url, options)
    .then(() => {
      console.log(MONGO_USERNAME);
      console.log(MONGO_PASSWORD);
      console.log(MONGO_PORT);
      console.log(MONGO_HOSTNAME);
      console.log(MONGO_DB);
      console.log('mongoDB is connected');
    })
    .catch(err => console.error(err));
};

module.exports = { connect };

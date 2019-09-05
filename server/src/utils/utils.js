const jwt = require('jsonwebtoken');

const APP_SECRET = 'MY-app_secret';

function getUserId(context) {
  const Authorization = context;
}

module.exports = {
  APP_SECRET,
  getUserId,
};

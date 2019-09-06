const jwt = require('jsonwebtoken');

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.API_KEY);
    return payload;
  }
  throw new Error('Not authenticated');
}

module.exports = {
  getUserId,
};

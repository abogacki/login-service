const koaJWT = require('koa-jwt');

module.exports = koaJWT({
  secret: process.env.API_KEY,
});

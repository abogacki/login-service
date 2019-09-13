const AuthService = require('../../services/AuthService');

const index = async ctx => {
  await ctx.render('index');
};

const auth = require('./authRoutes');
const login = require('./login');
const logout = require('./logout');
const signUp = require('./signUp');

module.exports = {
  index,
  signUp,
  logout,
  login,
  auth,
};

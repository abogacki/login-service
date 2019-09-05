// const { Gadget } = require('../models/Gadget');
const { User } = require('../../models/User');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (root, args, context, info) => {
  const { password, name, email } = args;

  const hash = await bcrpyt.hash(password, 10);

  const token = jwt.sign({ email, password }, process.env.DB_PASSWORD);

  const newUser = new User({
    name,
    email,
    hash,
    token,
  });
  await newUser.save();
  return newUser;
};

const login = async (root, args, context, info) => {
  const { name, password } = args;
};

module.exports = {
  signUp,
  login,
};

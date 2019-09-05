// const { Gadget } = require('../models/Gadget');
const { User } = require('../../models/User');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../../utils/utils');

const signUp = async (root, args, context, info) => {
  const { password, name, email } = args;

  const hash = await bcrpyt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    hash,
  });
  await newUser.save();

  console.log(APP_SECRET, 'APP_SECRET');

  const token = jwt.sign({ sub: newUser._id }, APP_SECRET);

  return {
    token,
    user: newUser,
  };
};

const login = async (root, args, context, info) => {
  const { email, password } = args;

  const user = await User.find({ email });
  if (!user) throw new Error('Incorrect credentials');
  if (!bcrpyt.compareSync(password, user.password))
    throw new Error('Incorrect credentials');

  const token = jwt.sign({ sub: password }, APP_SECRET);

  return {
    user,
    token,
  };
};

module.exports = {
  signUp,
  login,
};

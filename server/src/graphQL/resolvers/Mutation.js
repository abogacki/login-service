const { User } = require('../../models/User');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (root, args, context, info) => {
  try {
    const { password, name, email } = args;

    const hash = await bcrpyt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
    });
    await newUser.save();

    const token = jwt.sign({ sub: newUser._id }, process.env.API_KEY);

    return {
      token,
      user: newUser,
    };
  } catch (error) {
    throw error;
  }
};

const login = async (root, args, context, info) => {
  const { email, password } = args;

  const user = await User.findOne({ email });
  if (!user) throw new Error('Incorrect credentials');

  const isValid = await bcrpyt.compare(password, user.password);
  if (!isValid) throw new Error('Incorrect credentials');

  const token = jwt.sign({ sub: password }, process.env.API_KEY);

  return {
    user,
    token,
  };
};

const addGadget = async (root, args, context, info) => {
  // console.log(await ctx.login());
  return 'New Gadget';
};

module.exports = {
  signUp,
  login,
  addGadget,
};

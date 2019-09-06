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
      hash,
    });
    await newUser.save();

    console.log(process.env.API_KEY);

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
  console.log(email, password);

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw new Error('Incorrect credentials');

  const isValid = await bcrpyt.compare(password, user.hash);
  console.log('isValid', isValid);
  if (!isValid) throw new Error('Incorrect credentials');

  const token = jwt.sign({ sub: password }, process.env.API_KEY);

  return {
    user,
    token,
  };
};

module.exports = {
  signUp,
  login,
};

const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../../utils/utils');
const { User } = require('../../models/User');
const { Gadget } = require('../../models/Gadget');
const { UserGadget } = require('../../models/UserGadget');

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

    const token = jwt.sign({ id: newUser._id }, process.env.API_KEY);

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

  const token = jwt.sign({ id: user._id }, process.env.API_KEY);

  return {
    user,
    token,
  };
};

const gadgetCreate = async (root, args, context, info) => {
  const gadget = new Gadget({
    name: args.name, // explcitly
    by_company: args.by_company, // explcitly
    price: args.price, // explcitly
    release_date: args.release_date,
  });

  await gadget.save();

  const { id } = getUserId(context);
  const user = await User.findById(id);

  const newGadgetUserPair = new UserGadget({
    gadget,
    user,
  });

  await newGadgetUserPair.save();
  return newGadgetUserPair;
};

const gadgetBuy = async (root, args, context) => {
  const { id } = getUserId(context);
  const { gadgetId } = args;
  const user = await User.findById(id);
  const gadget = await Gadget.findById(gadgetId);

  const newPair = new UserGadget({
    user,
    gadget,
  });

  await newPair.save();

  return UserGadget.find({ user })
    .populate('gadget')
    .populate('user')
    .exec();
};

module.exports = {
  signUp,
  login,
  gadgetCreate,
  gadgetBuy,
};

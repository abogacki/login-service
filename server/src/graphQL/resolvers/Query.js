const { Gadget } = require('../../models/Gadget');
const { User } = require('../../models/User');

const hello = () => 'world';

const gadget = (parent, args) => {
  return Gadget.find(args);
};

const gadgets = (parent, args) => {
  return Gadget.find();
};

const user = async (parent, args) => {
  const result = await User.findOne(args);
  return result;
};

const users = async (parent, args) => {
  const result = await User.find(args);
  return result;
};

module.exports = {
  hello,
  gadget,
  gadgets,
  users,
  user,
};

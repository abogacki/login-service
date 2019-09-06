const { User } = require('../../models/User');
const { Gadget } = require('../../models/Gadget');

const user = async (root, args, context, info) => {
  return User.findById(root.user);
};

const gadget = async (root, args, context, info) => {
  return Gadget.findById(root.gadget);
};

module.exports = {
  user,
  gadget,
};

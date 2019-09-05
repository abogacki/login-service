const { Gadget } = require('../../models/Gadget');

const hello = () => 'world';

const gadget = (parent, args) => {
  return Gadget.findById(args.id);
};

const gadgets = () => {
  return Gadget.find();
};

module.exports = {
  hello,
  gadget,
  gadgets,
};

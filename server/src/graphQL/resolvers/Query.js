const { Gadget } = require('../../models/Gadget');
const { User } = require('../../models/User');

const hello = () => 'world';

const gadget = (parent, args) => {
  const fields = Gadget.schema.eachPath(path => console.log(path));

  const queryParams = fields.reduce(
    (all, currentField) => ({ ...all, currentField: args[currentField] }),
    {}
  );

  return Gadget.find(queryParams);
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
  users,
  user,
};

const mapArgsToModelsParams = (args, model) => {
  let params;
  model.schema.eachPath(path => (params[path] = args[path]));
  return;
};

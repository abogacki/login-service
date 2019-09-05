const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const { Gadget } = require('../models/Gadget');

const typeDefs = importSchema(__dirname + '/schema.graphql');
const resolvers = {
  Query: {
    hello: () => 'world',
    gadget: (parent, args) => {
      return Gadget.findById(args.id);
    },
    allGadgets: () => {
      return Gadget.find();
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserGadgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  gadget: {
    type: Schema.Types.ObjectId,
    ref: 'Gadget',
  },
});

const UserGadget = model('GadgetUser', UserGadgetSchema);

module.exports = {
  UserGadget,
  UserGadgetSchema,
};

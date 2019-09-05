const { Schema, model } = require('mongoose');
const { GadgetSchema } = require('./Gadget');

const UserSchema = new Schema({
  _id: String,
  gadgets: [GadgetSchema],
  profiles: [ProfileSchema],
});

const ProfileSchema = new Schema({
  likes: [String],
  dislikes: [String],
});

exports.default = model('users', UserSchema);

module.exports = {
  UserSchema,
  ProfileSchema,
};

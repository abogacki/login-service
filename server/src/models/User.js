const { Schema, model } = require('mongoose');
const { GadgetSchema } = require('./Gadget');

const ProfileSchema = new Schema({
  likes: [String],
  dislikes: [String],
});

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  gadgets: [GadgetSchema],
  profiles: [ProfileSchema],
});

const User = model('users', UserSchema);

module.exports = {
  User,
  UserSchema,
  ProfileSchema,
};

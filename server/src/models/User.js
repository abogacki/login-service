const { Schema, model } = require('mongoose');
const { GadgetSchema } = require('./Gadget');
const bcrypt = require('bcryptjs');

const ProfileSchema = new Schema({
  likes: [String],
  dislikes: [String],
});

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  gadgets: [GadgetSchema],
  profiles: [ProfileSchema],
});

UserSchema.methods.validatePassword = function(candidatePassowrd) {
  bcrypt.compare(candidatePassowrd, this.password, function(err, isMatch) {
    if (err) throw cb(err);
    cb(null, isMatch);
  });
};

const User = model('users', UserSchema);

module.exports = {
  User,
  UserSchema,
  ProfileSchema,
};

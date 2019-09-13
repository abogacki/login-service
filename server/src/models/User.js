const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfileSchema = new Schema({
  likes: [String],
  dislikes: [String],
});

const UserSchema = new Schema({
  name: String,
  createdAt: Date,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  facebookId: {
    type: String,
    unique: true,
    index: true,
  },
});

UserSchema.statics.findOneOrCreate = async function(condition) {
  const self = this;
  const user = await self.findOne(condition);
  if (user) {
    return user;
  } else {
    const newUser = await self.create(condition);
    return newUser;
  }
};

UserSchema.methods.validatePassword = function(candidatePassowrd) {
  bcrypt.compare(candidatePassowrd, this.password, function(err, isMatch) {
    if (err) throw cb(err);
    cb(null, isMatch);
  });
};

const User = model('User', UserSchema);

module.exports = {
  User,
  UserSchema,
  ProfileSchema,
};

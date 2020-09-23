const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const SinginError = require('../errors/SinginError');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    validate: (email) => validator.isEmail(email),
    unique: true,
  },
},
{
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new SinginError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matcher) => {
          if (!matcher) {
            throw new SinginError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

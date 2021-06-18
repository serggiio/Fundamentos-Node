const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
  type: String,
  local: {
      email: String,
      password: String
  },
  facebook: {
      email: String,
      password: String,
      id: String,
      token: String,
      name: String,
      provider_id: {type: String, unique: true},
      photo: String,
      createdAt: {type: Date, default: Date.now},
      extra: Object

  },
  twitter: {
    email: String,
    password: String,
    id: String,
    token: String 
  },
  google: {
    email: String,
    password: String,
    id: String,
    token: String 
  }
});

//Encrypt password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

//Validate password
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
};

const User = mongoose.model('User', userSchema);

module.exports = User;
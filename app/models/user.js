var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
var User = mongoose.model('users', userSchema);

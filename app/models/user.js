var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  passwordConfirmation: String,
  salt: String
},
{
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.password !== this.passwordConfirmation) return next(new Error());
  this.passwordConfirmation = null;
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    user.salt = salt;
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

mongoose.model('users', userSchema);

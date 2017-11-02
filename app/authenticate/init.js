var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      // User not found
      if (!user) {
        return done(null, false);
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.password, function(err, isValid) {
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
));

var passport = require('passport'),
  bcrypt = require('bcrypt'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
        'username': username
      },
      function(err, user) {
        if (err) return done(err);
        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        bcrypt.compare(password, user.password, function(err, isValid) {
          if (err) {
            return done(err);
          }
          if (!isValid) {
            return done(null, false, {
              message: 'Username and password do not match'
            });
          }
          return done(null, user);
        });
      }
    );
  }));

// var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var User = mongoose.model('users');

module.exports = {

  requireLogin: function (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    };
  },

  setSession: function (req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, function(err, user) {
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = user;
          res.locals.user = user;
        }
        next();
      });
    } else {
      next();
    }
  },

};

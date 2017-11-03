'use strict';

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {

  requireLogin: function(req, res, next) {
    if (!req.user) {
      res.redirect('/sessions/new');
    } else {
      next();
    };
  },

  setSession: function(req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({
        email: req.session.user.email
      }, function(err, user) {
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

  deleteSession: function(req, res, next) {
    if (req.query._method == 'DELETE') {
      req.method = 'DELETE';
      req.url = req.path;
    }
    next();
  }

};

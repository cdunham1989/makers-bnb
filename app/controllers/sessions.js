'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {

  createSession: function (req, res) {
    User.findOne({
      username: req.body.username
    }).exec(function (err, user) {
      if (user) {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch === true) {
            req.session.user = user;
            res.redirect('/users/' + user.username);
          } else {
            res.redirect('/sessions/new');
          }
        });
      } else {
        res.redirect('/sessions/new');
      }
    });
  },

  newSession: function (req, res) {
    res.render('sessions/new');
  },
  
  endSession: function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  }

};

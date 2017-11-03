'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router(),
      User = mongoose.model('users');

router.get('/new', function (req, res) {
  res.render('sessions/new');
});

router.post('/', function (req, res) {
  User.findOne({ username: req.body.username }).exec(function (err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch === true) {
        req.session.user = user;
        res.redirect('/users/' + user.username);        
      } else {
        res.redirect('/sessions/new');
      }
    });
  });
});

module.exports = router;

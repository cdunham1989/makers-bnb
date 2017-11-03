'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('users');
var Space = mongoose.model('spaces');
var Booking = mongoose.model('bookings');
var express = require('express');
var router = express.Router();
var sessionTools = require('../bin/sessionTools');

router.get('/new', function(req, res) {
  res.render('users/new');
});

router.post('/', function(req, res) {
  var newUser = new User(req.body);
  newUser.save().then(function (item) {
    req.session.user = newUser
    res.redirect('/users/' + newUser.username);
    })
    .catch(function(err) {
      res.redirect('/users/new');
    });
});

router.delete('/', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

router.get('/:username', sessionTools.requireLogin, function (req, res) {
  Space
    .find({ owner: req.user.id })
    .exec(function (err, spaces) {
      Booking
        .find({ bookingUser: req.user.id })
        .populate('bookingSpace')
        .exec(function (err, bookings) {
          res.render('users/index', {
            user: req.user,
            spaces: spaces,
            bookings: bookings
          });
        })
    });
});

module.exports = router;

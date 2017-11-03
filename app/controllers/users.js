'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('users');
const Space = mongoose.model('spaces');
const Booking = mongoose.model('bookings');

module.exports = {

  newUser: function (req, res) {
    res.render('users/new');
  },

  createUser: function (req, res) {
    var newUser = new User(req.body);
    newUser.save().then(function (item) {
      req.session.user = newUser;
      res.redirect('/users/' + newUser.username);
    })
      .catch(function (err) {
        res.redirect('/users/new');
      });
  },

  getUserProfile: function (req, res) {
    Space
      .find({
        owner: req.user.id
      })
      .exec(function (err, spaces) {
        Booking
          .find({
            bookingUser: req.user.id
          })
          .populate('bookingSpace')
          .exec(function (err, bookings) {
            res.render('users/index', {
              user: req.session.user,
              spaces: spaces,
              bookings: bookings
            });
          });
      });
  }
  
}

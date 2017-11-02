const mongoose = require('mongoose');
const Space = mongoose.model("spaces");
const Booking = mongoose.model("bookings");
var express = require('express');
var router = express.Router();
var sessionTools = require('../bin/sessionTools');

router.get('/new', sessionTools.requireLogin, (req, res) => {
  Space.findOne({ _id: req.query.spaceId })
    .exec(function (err, doc) {
      res.render('bookings/new', { space: doc });
  });
});

router.post("/", (req, res) => {
  newBooking = new Booking({
    bookingSpace: req.body.spaceId,
    bookingUser: req.user.id
  })
  newBooking
    .save()
    .then(item => {
      Booking
        .find()
        .populate('bookingSpace')
        .exec(function (err, doc) {
          res.redirect('/users/' + req.user.username);
        })
    })
    .catch(err => {
      res.redirect('/bookings/new?spaceId=' + req.body.spaceId);
    })  
});

module.exports = router;

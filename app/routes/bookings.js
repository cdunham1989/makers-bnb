'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Space = mongoose.model("spaces");
const Booking = mongoose.model("bookings");
const sessionTools = require('../bin/sessionTools');

router.get('/new', sessionTools.requireLogin, (req, res) => {
  Space.findOne({ _id: req.query.spaceId })
    .exec(function (err, doc) {
      res.render('bookings/new', { space: doc });
  });
});

router.post("/", (req, res) => {
  var newBooking = new Booking({
    bookingSpace: req.body.spaceId,
    bookingUser: req.user.id,
    bookingStartDate: req.body.startDate,
    bookingEndDate: req.body.endDate
  })
  Booking.find({
    bookingSpace: req.body.spaceId,
    bookingStartDate: { $lt: req.body.endDate },
    bookingEndDate: { $gt: req.body.startDate }
  }).exec(function (err, doc) {
    if (!doc) {
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
        });
    } else {
      res.redirect('/bookings/new?spaceId=' + req.body.spaceId);
    }
  });
});

module.exports = router;

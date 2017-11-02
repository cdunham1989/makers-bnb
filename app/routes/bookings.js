const mongoose = require('mongoose');
const Space = mongoose.model("spaces");
const Booking = mongoose.model("bookings");
var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/new', requireLogin, (req, res) => {
  Space.findOne({ _id: req.query.spaceId })
    .exec(function (err, doc) {
      res.render('bookings/new', { space: doc });
  });
});

router.post("/", (req, res) => {
  newBooking = new Booking({
    bookingSpace: req.body.spaceId,
    // bookingStartDate: we should pass in our own date
    // bookingEndDate: we should pass in our own date    
    // bookingUserId: need user id here ??? 
  })
  newBooking
    .save()
    .then(item => {
      Booking
        .find()
        .populate('bookingSpace') // joins the spaces model
        .exec(function (err, doc) {
          res.send('You have requested to book ' + doc[0].bookingSpace.spaceName);
          // just for testing.. viewing all bookings on screen atm..
        })
    })
    .catch(err => {
      res.redirect('spaces'); //redirecting back to spaces if error?
    })  
});

module.exports = router;

const mongoose = require('mongoose');
const Space = mongoose.model("spaces");
const Booking = mongoose.model("bookings");
var express = require('express');
var router = express.Router();

router.get('/new', (req, res) => {
  res.render('spaces/new');
});

router.get("/", (req, res) => {
  Space
    .find()
    .exec(function (err, doc) {
      res.render('spaces/index', { spaces: doc });
    });
});

router.post("/", (req, res) => {
  var newSpace = new Space(req.body);
  newSpace.save()
    .then(item => {
      res.redirect('/spaces');
    })
    .catch(err => {
      res.send('spaces/new');
    });
});

router.get('/book', (req, res) => {
  Space.findOne({ _id: req.query.spaceId })
    .exec(function (err, doc) {
      res.render('spaces/book', { space: doc });
  });
});

router.post("/book", (req, res) => {
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

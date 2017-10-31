const mongoose = require('mongoose');
const Listing = mongoose.model("listings");
var express = require('express');
var router = express.Router();

router.get('/new', (req, res) => {
  res.render('listings/new');
});

router.get("/", (req, res) => {
  Listing
    .find()
    .select('listingName listingDescription')
    .exec(function (err, doc) {
      res.render('listings/index', { listings: doc });
    });
});

router.post("/", (req, res) => {
  var newListing = new Listing(req.body);
  newListing.save()
    .then(item => {
      res.redirect('/listings');
    })
    .catch(err => {
      res.send('listings/new');
    });
});

module.exports = router;

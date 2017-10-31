const mongoose = require('mongoose');
const Listing = mongoose.model("listings");
var express = require('express');
var router = express.Router();

router.get('/new', (req, res) => {
  res.render('index');
});

router.get("/", (req, res) => {
  Listing
    .find()
    .select('listingName listingDescription')
    .exec(function (err, doc) {
      res.render('index', { listings: doc });
      console.log(doc);
    });
});

router.post("/", (req, res) => {
  var newListing = new Listing(req.body);
  newListing.save()
    .then(item => {
      res.redirect('/listings');
    })
    .catch(err => {
      res.send('index');
    });
});

module.exports = router;

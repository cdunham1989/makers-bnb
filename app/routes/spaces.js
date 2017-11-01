const mongoose = require('mongoose');
const Space = mongoose.model("spaces");
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

module.exports = router;

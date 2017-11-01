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

router.get('book/:spaceId', (req, res) => {
  // res.render('spaces/book');
  // var query = req.query
  // var params = req.params
  // console.log(req.params)
  // console.log(req.query)
  // var data = req.params.spaceId;
  // console.log(data)
  // res.send("hi"+ data + query + params);
    res.send("hi");
});

// router.get("/book", (req, res) => {
//   // Space
//   //   .find()
//   //   .exec(function (err, doc) {
//   //     res.render('spaces/book/', { spaces: doc });
//   //   });
// });
module.exports = router;

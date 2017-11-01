const mongoose = require('mongoose');
const Space = mongoose.model("spaces");
var express = require('express');
var router = express.Router();

// router.get('/book/:spaceId', (req, res) => {
//   // res.render('spaces/book');
//   var data = req.params.spaceId;
//   res.send(data)
// });
//
// router.get("/", (req, res) => {
//   Space
//     .find()
//     .exec(function (err, doc) {
//       res.render('spaces/book/', { spaces: doc });
//     });
// });


module.exports = router;

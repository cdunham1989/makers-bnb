var express = require('express');
var router = express.Router();
var user = require('../models/user');
var mongoose = require('mongoose');
var User = mongoose.model('users');


/* GET users listing. */
router.get('users/new', function(req, res, next) {
  res.render('newUser');
});

router.post('/', function(req, res, next) {
  var newUser = new User(req.body);
  newUser.save();
  res.redirect('/users/confirmation');
});

router.get('/confirmation', function(req, res, next) {
  // User.findOne({}, {}, function(e, r) {
  //   console.log(r.username);
  //   res.render('confirmation', {
  //     username: r.username
  //   });
  // });

  User.findOne().sort({
    $natural: -1
  }).exec(function(e, r) {
    res.render('confirmation', {
      username: r.username
    });
  });
});


module.exports = router;

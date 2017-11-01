var mongoose = require('mongoose');
var User = mongoose.model('users');
var express = require('express');
var router = express.Router();

router.get('/new', function(req, res) {
  res.render('newUser');
});

router.post('/', function(req, res) {
  var newUser = new User(req.body);
  newUser.save().then(item => {
      res.redirect('/users/confirmation');
    })
    .catch(err => {
      res.send('users/new');
    });
});

router.get('/confirmation', function(req, res) {

  User.findOne().sort({
    $natural: -1
  }).exec(function(e, r) {
    res.render('confirmation', {
      username: r.username
    });
  });
});


module.exports = router;

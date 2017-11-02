var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  User = mongoose.model('users');

router.get('/', function (req, res) {
  console.log(req.user);
  res.render('home');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/home', function (req, res) {
  User.findOne({ username: req.body.username }).exec(function (err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch === true) {
        req.session.user = user;
        res.redirect('/users/' + user.username + '/spaces');        
      } else {
        res.redirect('/login');
      }
    });
  });
});

module.exports = router;

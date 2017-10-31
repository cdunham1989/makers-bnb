var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('users/new', function(req, res, next) {
  res.render('newUser');
});

router.post('/', function(req, res, next) {
  res.redirect('/users/confirmation');
});

router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', {
    username: 'Chris'
  });
});


module.exports = router;

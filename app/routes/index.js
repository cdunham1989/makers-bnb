var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home');
});


router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/home', function(req, res) {
  console.log(req.body.username);

});

module.exports = router;

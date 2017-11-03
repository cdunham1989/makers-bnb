'use strict';

const express = require('express');
const router = express.Router();
const sessionTools = require('../bin/sessionTools');

const mongoose = require('mongoose');
const Space = mongoose.model("spaces");

router.get('/new', sessionTools.requireLogin, (req, res) => {
  res.render('spaces/new');
});

router.get("/", (req, res) => {
  Space
    .find()
    .exec(function(err, doc) {
      res.render('spaces/index', {
        spaces: doc
      });
    });
});

router.post("/", (req, res) => {
  var newSpace = new Space(req.body);
  newSpace.owner = req.user.id
  newSpace.save()
    .then(item => {
      res.redirect('/users/' + req.user.username);
    })
    .catch(err => {
      res.redirect('spaces/new');
    });
});

module.exports = router;

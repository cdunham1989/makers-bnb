'use strict';

const mongoose = require('mongoose');
const Space = mongoose.model("spaces");

module.exports = {

  newSpace: function (req, res) {
    res.render('spaces/new');
  },
  
  getSpaces: function (req, res) {
    Space
      .find()
      .exec(function (err, doc) {
        res.render('spaces/index', {
          spaces: doc
        });
      })
  },

  createSpace: function (req, res) {
    var newSpace = new Space(req.body);
    newSpace.owner = req.user.id
    newSpace.save()
      .then(item => {
        res.redirect('/users/' + req.user.username);
      })
      .catch(err => {
        res.redirect('spaces/new');
      })
  }

}

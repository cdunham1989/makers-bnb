'use strict';

const Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../app/app');
var mongoose = require('mongoose');
var http = require('http');
var User = mongoose.model('users');

Browser.localhost('makers-bnb.com', 3001);

describe('bcrypt', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);
  });

  describe('test matching passwords', function() {
    before(function(done) {
      browser
        .fill('username', 'ChristopherRobin2')
        .fill('email', 'chris@hacc.com')
        .fill('password', 'hello123')
        .fill('passwordConfirmation', 'hello12')
        .pressButton('Sign Me Up!', done);

    });

    it('should only create a user if passwords match', function() {
      User.findOne({username: 'ChristopherRobin2'}, function(err, doc) {
        console.log(doc.username);
      })
    });

    it('should see welcome page', function() {
      expect(3).to.equal(3);
    });
  });

  after(function (done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });
});

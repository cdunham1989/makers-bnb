'use strict';

var Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../../app/app');
var mongoose = require('mongoose');
var http = require('http');
var User = require('../../app/models/user');


Browser.localhost('makers-bnb.com', 3001);

describe('Log in', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/', done);
  });

  before(function(done) {
    var user = new User({
      username: 'Hugo',
      email: 'email@email.email',
      password: 'hello123'
    });
    browser
      .fill('username', 'Hugo')
      .fill('password', 'hello123')
      .pressButton('Sign In!', done);
  });

  describe("User should be able to log in", function() {
    it('expects to be able to able to log in', function() {
      expect(brower.html('body')).to.contain('Welcome, Hugo!');
    });
  });

});

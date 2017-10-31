const Browser = require('zombie');
var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app/app');
var server;
// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3001);


describe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    server = app.listen(3001);
    browser.visit('/users/new', done);
  });

  after(function() {
    server.close();
  });

  describe('Signing up form', function() {
    before(function(done) {
      browser
        .fill('username', 'Chris')
        .fill('email', 'chris@hacc.com')
        .fill('password', 'hello123')
        .fill('passwordConfirmation', 'hello123')
        .pressButton('Sign Me Up!', done);
    });

    it('should see welcome page', function() {
      expect(browser.html('body')).to.contain('Welcome, Chris!');
    });
  });
});

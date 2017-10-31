// 'use strict';

const Browser = require('zombie');
var assert = require('chai').assert;
var app = require('../app/app');
var server;
// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3001);


describe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    server = app.listen(3001);
    browser.visit('/', done);

  });

  after(function() {
    server.close();
  });

  browser.visit('/', function() {
    console.log(browser.location.href);
  });

  it('should be successful', function() {
    browser.assert.success();
  });

  it('should see welcome page', function() {
    console.log('hello peeps');
  });
});

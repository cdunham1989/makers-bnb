// 'use strict';

const Browser = require('zombie');
var assert = require('chai').assert;
var app = require('../app/app');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits signup page', function() {

  const browser = new Browser();

  browser.visit('/path', function() {
    console.log(browser.location.href);
  });

  before(function(done) {
    browser.visit('/', done);
  });

  //
  // before(function(done) {
  //   browser
  //     .fill('email', 'zombie@underworld.dead')
  //     .fill('password', 'eat-the-living')
  //     .pressButton('Sign Me Up!', done);
  // });

  it('should be successful', function() {
    // browser.assert.success();
  });

  it('should see welcome page', function() {
    console.log('hello peeps');
    // browser.assert.text('title', 'Welcome To Brains Depot');
  });
});

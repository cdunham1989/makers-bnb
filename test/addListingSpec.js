'use strict';

const Browser = require('zombie');
var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app/app');
var server;
Browser.localhost('example.com', 3001);

describe('adding a listing', function (){

  const browser = new Browser();

  before(function (done) {
    server = app.listen(3001);
    done();
  });

  after(function () {
    server.close();
  });


  it('should be a zombie', function(done) {
    // browser.assert.success();
    browser.visit('/lisitngs/new', done);
      console.log(browser.location.href);
    browser
      .fill('listingName', "Bob")
      .fill('listingLocation', "London")
      .fill('listingPricePerNight', "300")
      .fill('listingNumberOfRooms', "4")
      .fill('listingDescription', "Nice")
      .check('listingPetFriendlyTrue')
      .pressButton('Add Listing', done);

    expect(browser.html("body")).to.equal("Listing has been saved");

      console.log(browser.location.href);
      done();
  });


});

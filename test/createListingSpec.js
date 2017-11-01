'use strict';

const Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../app/app');
var mongoose = require('mongoose');
var http = require('http');

Browser.localhost('makers-bnb.com', 3001);

describe('listings', function (){

  const browser = new Browser();

  before(function (done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/listings/new', done);
  });


  describe('creating a listing', function () {

    before(function (done) {
      browser
        .fill('listingName', "Bob sykes")
        .fill('listingLocation', "London")
        .fill('listingPricePerNight', "300")
        .fill('listingNumberOfRooms', "4")
        .fill('listingDescription', "Nice")
        .choose('no')
        .pressButton('Add Listing', done)
    });
    
    it('allows a user to create a listing', function () {
      expect(browser.html('body')).to.contain("Bob sykes");
    });

  });

  after(function (done) {
    // mongoose.connection.db.dropDatabase();
    this.server.close(done);
  });

});

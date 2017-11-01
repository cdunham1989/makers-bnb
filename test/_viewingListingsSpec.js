'use strict';

const Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../app/app');
var mongoose = require('mongoose');
var http = require('http');

Browser.localhost('makers-bnb.com', 3001);

describe('listings test', function (){

  const browser = new Browser();
  const Listing = mongoose.model("listings");

  before(function (done) {
    this.server = http.createServer(app).listen(3001);
    var newListing = new Listing({
      listingName: 'Bob sykes',
      listingLocation: 'London',
      listingPricePerNight: '300',
      listingNumberOfRooms: '4',
      listingDescription: 'Nice'});
    newListing.save(done);
  });


  describe('viewing a listing', function () {

    before(function (done) {
      browser.visit('/listings', done);
    });
    
    it('allows a user to view all listings', function () {
      expect(browser.html('body')).to.contain("Bob sykes");
    });

  });

  after(function (done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

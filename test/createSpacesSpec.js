'use strict';

const Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../app/app');
var mongoose = require('mongoose');
var http = require('http');

Browser.localhost('makers-bnb.com', 3001);

describe('Spaces', function (){

  const browser = new Browser();

  before(function (done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/spaces/new', done);
  });


  describe('creating a space', function () {

    before(function (done) {
      browser
        .fill('spaceName', "Bob sykes")
        .fill('spaceLocation', "London")
        .fill('spacePricePerNight', "300")
        .fill('spaceNumberOfRooms', "4")
        .fill('spaceDescription', "Nice")
        .choose('no')
        .pressButton('List Space', done)
    });
    
    it('allows a user to create a space', function () {
      expect(browser.html('body')).to.contain("Bob sykes");
    });

  });

  after(function (done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);    
  });

});

'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('bookings', function (){

  const browser = new Browser();
  const Space = mongoose.model("spaces");

  before(function (done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);    
  });

  before(function(done) {
    browser
      .fill('username', 'Chris')
      .fill('email', 'chris@hacc.com')
      .fill('password', 'hello123')
      .fill('passwordConfirmation', 'hello123')
      .pressButton('Sign Me Up!', done);
  });

  before(function (done) {
    browser.visit('/sessions/new', done);
  });

  before(function(done) {
    browser
      .fill('username', 'Chris')
      .fill('password', 'hello123')
      .pressButton('Login', done);
  });

  before(function (done) {
    browser.visit('/spaces/new', done);
  });

  before(function(done) {
    browser
      .fill('spaceName', "Bob sykes")
      .fill('spaceLocation', "London")
      .fill('spacePricePerNight', "300")
      .fill('spaceNumberOfRooms', "4")
      .fill('spaceDescription', "Nice")
      .choose('no')
      .pressButton('List Space', done)
  });

  before(function (done) {
    browser.visit('/spaces', done);
  });

  before(function (done) {
    browser.pressButton('Book Me', done);
  });

  before(function (done) {
    browser.pressButton('Confirm', done);
  });

  describe('viewing a space booking', function () {

    it('requests a booking', function () {
      expect(browser.html('body')).to.contain('Bob sykes');
    });

  });

  after(function (done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

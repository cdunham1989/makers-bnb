'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Log in', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);
  });

  before(function(done) {
    browser
      .fill('username', 'Hugo')
      .fill('email', 'chris@hacc.com')
      .fill('password', 'hello123')
      .fill('passwordConfirmation', 'hello123')
      .pressButton('Sign Me Up!', done);
  });



  describe("User should be able to log in", function() {

    before(function(done) {
      browser.visit('/sessions/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Hugo')
        .fill('password', 'hello123')
        .pressButton('Login', done);
    });

    it('expects to be able to able to log in', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/users/Hugo');
    });

  });

  describe("User shouldn't be able to log in with incorrect password", function() {

    before(function(done) {
      browser.visit('/sessions/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Hugo')
        .fill('password', 'hello321')
        .pressButton('Login', done);
    });

    it('expects to not be able to able to log in when using the wrong password', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/sessions/new');
    });

  });

  describe("User shouldn't be able to log in to an account that doesn't exist", function() {

    before(function(done) {
      browser.visit('/sessions/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Jack')
        .fill('password', 'hello321')
        .pressButton('Login', done);
    });

    it('expects to not be able to able to log in when using the wrong account', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/sessions/new');
    });

  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Session tools', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);
  });

  describe('logging in after logging in', function() {

    before(function(done) {
      browser
        .fill('username', 'Chris')
        .fill('email', 'chris@hacc.com')
        .fill('password', 'hello123')
        .fill('passwordConfirmation', 'hello123')
        .pressButton('Sign Me Up!', done);
    });

    before(function(done) {
      browser.visit('/users/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Hugo')
        .fill('email', 'hugo@hacc.com')
        .fill('password', 'hello123')
        .fill('passwordConfirmation', 'hello123')
        .pressButton('Sign Me Up!', done);
    });

    before(function(done) {
      browser.visit('/sessions/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Hugo')
        .fill('password', 'hello123')
        .pressButton('Login', done);
    });

    before(function(done) {
      browser.visit('/sessions/new', done);
    });

    before(function(done) {
      browser
        .fill('username', 'Chris')
        .fill('password', 'hello123')
        .pressButton('Login', done);
    });

    it('should be redirected to the login page when not signed in', function() {
      expect(browser.url).to.equal("http://makers-bnb.com/users/Chris");
    });

  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

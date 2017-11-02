'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Log in', function() {

  const browser = new Browser();

  before(function (done) {
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

  before(function(done) {
    browser.visit('/sessions/new', done);
  });

  before(function(done) {
    browser
      .fill('username', 'Hugo')
      .fill('password', 'hello123')
      .pressButton('Login', done);
  });

  describe("User should be able to log in", function () {
    
    it('expects to be able to able to log in', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/users/Hugo');
    });
  
  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

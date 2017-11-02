'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Logout', function() {

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
    browser.visit('/login', done);
  });
 
  before(function (done) {
    browser
      .fill('username', 'Hugo')
      .fill('password', 'hello123')
      .pressButton('Login', done);
  });

  describe("logging out", function() {

    before(function (done) {
      browser.pressButton('Log Out', done);
    });

    it('redirects to the home page', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/');
    });
  
  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

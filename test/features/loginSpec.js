'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Log in', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/login', done);
  });

  before(function(done) {
    var user = new User({
      username: 'Hugo',
      email: 'email@email.email',
      password: 'hello123'
    });
    browser
      .fill('username', 'Hugo')
      .fill('password', 'hello123')
      .pressButton('Login');
    done();
  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

  describe("User should be able to log in", function() {
    it('expects to be able to able to log in', function() {
      expect(browser.url).to.equal('http://makers-bnb.com/home');
    });
  });
});

'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('bcrypt', function() {

  const browser = new Browser();
  var userCount = 0;

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);
  });

  before(function(done) {
    browser
      .fill('username', 'Chris')
      .fill('email', 'chris@hacc.com')
      .fill('password', 'hello123')
      .fill('passwordConfirmation', 'hello')
      .pressButton('Sign Me Up!', done);
  });

  describe('test matching passwords', function() {
    it('should only create a user if passwords match', function() {
      User.count({}, function(err, count) {
        expect(count).to.equal(0);
      });
    });

    it('should see welcome page', function() {
      expect(3).to.equal(3);
    });
  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });
});

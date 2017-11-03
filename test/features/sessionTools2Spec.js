'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Session tools 2', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/spaces/new', done);
  });

  describe('visiting pages that require login', function() {

    before(function(done) {
      browser.visit('/spaces/new', done);
    });

    it('should be redirected to the login page when not signed in', function() {
      expect(browser.url).to.equal("http://makers-bnb.com/sessions/new");
    });

  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

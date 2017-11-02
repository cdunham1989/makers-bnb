'use strict';

Browser.localhost('makers-bnb.com', 3001);

describe('Spaces', function (){

  const browser = new Browser();
  const Listing = mongoose.model("spaces");

  before(function (done) {
    this.server = http.createServer(app).listen(3001);
    var newSpace = new Listing({
      spaceName: 'Bob sykes',
      spaceLocation: 'London',
      spacePricePerNight: '300',
      spaceNumberOfRooms: '4',
      spaceDescription: 'Nice'});
    newSpace.save(done);
  });


  describe('viewing a space', function () {

    before(function (done) {
      browser.visit('/spaces', done);
    });

    it('allows a user to view all spaces', function () {
      expect(browser.html('body')).to.contain("Bob sykes");
    });

  });

  after(function (done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});

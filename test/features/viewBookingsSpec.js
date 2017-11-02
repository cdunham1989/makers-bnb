// 'use strict';

// Browser.localhost('makers-bnb.com', 3001);

// describe('bookings', function (){

//   const browser = new Browser();
//   const Space = mongoose.model("spaces");

//   before(function (done) {
//     this.server = http.createServer(app).listen(3001);
//     var newSpace = new Space({
//       spaceName: 'Bob sykes',
//       spaceLocation: 'London',
//       spacePricePerNight: '300',
//       spaceNumberOfRooms: '4',
//       spaceDescription: 'Nice'});
//     newSpace.save(done);
//   });

//   before(function (done) {
//     browser.visit('/spaces', done);
//   });

//   before(function (done) {
//     browser.pressButton('Book Me', done);
//   });

//   before(function (done) {
//     browser.pressButton('Confirm', done);
//   });

//   describe('viewing a space booking', function () {

//     it('requests a booking', function () {
//       expect(browser.html('body')).to.contain('You have requested to book Bob sykes');
//     });

//   });

//   after(function (done) {
//     this.server.close();
//     mongoose.connection.db.dropDatabase(done);
//   });

// });

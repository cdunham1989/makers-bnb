const mongoose = require('mongoose');
// const Model = require(listing.js)
const Listing = mongoose.model("Listing")

app.get("/listings/new", (req, res) => {
  res.sendFile(__dirname + "/index.hbs");
});

app.post("/listings", (req, res) => {
  var newListing = new Listing(req.body);
  newListing.save()
    .then(item => {
      res.send("Listing has been saved");
    })
    .catch(err => {
      res.status(400).send("Unable to save listing");
    });
});

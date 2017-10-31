'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var listingSchema = new Schema({
  listingName: String,
  listingLocation: String,
  listingPricePerNight: String,
  listingNumberOfRooms: String,
  listingDescription: String,
  listingPetFriendlyTrue: Boolean
});

 mongoose.model('listings', listingSchema);

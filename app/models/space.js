'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var spaceSchema = new Schema({
  spaceName: String,
  spaceLocation: String,
  spacePricePerNight: String,
  spaceNumberOfRooms: String,
  spaceDescription: String,
  spacePetFriendlyTrue: Boolean
});

 mongoose.model('spaces', spaceSchema);
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  bookingSpace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'spaces'
  },
  bookingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  bookingStartDate: {
    type: Date,
  },
  bookingEndDate: {
    type: Date,
  },
  bookingConfirmed: {
    type: Boolean,
    default: false
  }
  },
  {
    timestamps: true
  });

mongoose.model('bookings', bookingSchema);

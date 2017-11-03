'use strict';

const express = require('express');
const router = express.Router();
const sessionTools = require('../bin/sessionTools');
const bookingController = require('../controllers/bookings');

router.get('/new', sessionTools.requireLogin, bookingController.newBooking);
router.post("/", bookingController.createBooking);

module.exports = router;

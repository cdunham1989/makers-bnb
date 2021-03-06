'use strict';

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessions');

router.get('/new', sessionController.newSession);
router.post('/', sessionController.createSession);
router.delete('/', sessionController.endSession);

module.exports = router;

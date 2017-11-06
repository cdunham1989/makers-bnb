'use strict';

const express = require('express');
const router = express.Router();
const sessionTools = require('../bin/sessionTools');
const spaceController = require('../controllers/spaces');

router.get('/new', sessionTools.requireLogin, spaceController.newSpace);
router.get("/", spaceController.getSpaces);
router.post("/", spaceController.createSpace);

module.exports = router;

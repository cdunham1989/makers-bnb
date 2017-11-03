'use strict';

const express = require('express');
const router = express.Router();
const sessionTools = require('../bin/sessionTools');
const userController = require('../controllers/users');

router.get('/new', userController.newUser);
router.post('/', userController.createUser);
router.get('/:username', sessionTools.requireLogin, userController.getUserProfile);

module.exports = router;

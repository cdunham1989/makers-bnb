'use strict';

var express = require('express');
var router = express.Router();
var sessionTools = require('../bin/sessionTools');
const userController = require('../controllers/users');

router.get('/new', userController.newUser);
router.post('/', userController.createUser);
router.get('/:username', sessionTools.requireLogin, userController.getUserProfile);
router.delete('/', userController.endSession);


module.exports = router;

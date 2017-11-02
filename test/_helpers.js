'use strict';

global.Browser = require('zombie');
global.expect = require('chai').expect;
global.app = require('../app/app');
global.mongoose = require('mongoose');
global.http = require('http');
global.User = mongoose.model('users');

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
var env = app.get('env');

//bootstrap models & routes
const space = require('./models/space');
const user = require('./models/user');
const booking = require('./models/booking');

var index = require('./routes/index');
var users = require('./routes/users');
var spaces = require('./routes/spaces');
var bookings = require('./routes/bookings');
var sessions = require('./routes/sessions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//session data
var sessionTools = require('./bin/sessionTools');
app.use(session({
  cookieName: 'session',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(sessionTools.setSession);
app.use(sessionTools.deleteSession);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/spaces', spaces);
app.use('/bookings', bookings);
app.use('/sessions', sessions);

var databaseURI = 'mongodb://localhost/makers-bnb-' + env;
// mongodb://heroku_k2frgcjb:lim8te267cf7v77ft2f5lmepdq@ds245755.mlab.com:45755/heroku_k2frgcjb
mongoose.Promise = global.Promise;
mongoose
  .connect(databaseURI, {
    useMongoClient: true
  })
  .then(function() {
      console.log('connected to database ' + databaseURI);
    },
    function(err) {
      console.log('unable to establish a connection');
    }
  );

process.on('SIGINT', function() {
  mongoose.disconnect(function() {
    console.log('disconnected from database on app termination');
    process.exit(0);
  });
});

module.exports = app;

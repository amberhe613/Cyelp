const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const keys = require('./config/keys');
const resturantRoute = require('./routes/resturantRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const User = mongoose.model('User');

// Require Database models
require('./db/userModel');
require('./db/restaurantModel');
require('./db/reviewModel');
require('./services/passport');

mongoose.connect(keys.mongoURI, function (err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// install, load, and configure body parser module
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static(path.join(__dirname, '../client/build')));

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(!err) done(null, user);
        else done(err, null);
    });
});

server.use(
    cookieSession({
        name: 'session',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 24 hours
        keys: [keys.cookieKey]
    })
);

server.use(passport.initialize());
server.use(passport.session());

require('./routes/authRoute')(server);
server.use('/api', userRoute);
server.use('/api', resturantRoute);
server.use('/api', reviewRoute);

server.listen(process.env.PORT || 3002, function(err) {
  if (err) {
    console.log('err: app listen');
  } else {
    console.log('app listening');
  }
});

// serve static built files
server.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


server.get('/index.html*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/service-worker.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/static/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
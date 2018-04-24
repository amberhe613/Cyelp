const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/authRoute');
const resturantRoute = require('./routes/resturantRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const likeRoute = require('./routes/likeRoute');
const adminRoute = require('./routes/adminRoute');
const User = mongoose.model('User');
var dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.load();

// Require Database models
require('./db/userModel');
require('./db/restaurantModel');
require('./db/reviewModel');
require('./services/passport');

mongoose.connect(process.env.MONGOLAB_URI, function (err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// CORS
server.use(cors());
server.options("*", cors());

// install, load, and configure body parser module
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// serialize and deserialize
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User
        .findById(id, function (err, user) {
            if (!err) 
                done(null, user);
            else 
                done(err, null);
            }
        );
});

server.use(cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY]
}));

server.use(express.static(path.join(__dirname, 'client/build')));

server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', authRoute);
server.use('/api', userRoute);
server.use('/api', resturantRoute);
server.use('/api', reviewRoute);
server.use('/api', likeRoute);
server.use('/api', adminRoute);

server.listen(process.env.PORT, function (err) {
    if (err) {
        console.log('err: app listen');
    } else {
        console.log('app listening');
    }
});

// serve static built files
server.get('/', function (req, res) {
    console.log("server get /");
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/index.html*', function (req, res) {
    console.log("server get index.html*");
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/service-worker.js', function (req, res) {
    console.log("server get service-worker.js");
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/static/*', function (req, res) {
    console.log("server get static");
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.get('/productImg/*', function (req, res) {
    console.log("server get productImg");
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
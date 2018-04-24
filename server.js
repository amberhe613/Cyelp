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

// install, load, and configure body parser module
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

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
        keys: [process.env.COOKIE_KEY]
    })
);

server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', authRoute);
server.use('/api', userRoute);
server.use('/api', resturantRoute);
server.use('/api', reviewRoute);
server.use('/api', likeRoute);
server.use('/api', adminRoute);

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets like our main.js file or main.css file!
    server.use(express.static("client/build"));

    // Express will serve up index.html file if it doesn't recognize the route
    const path = require("path");
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Set up serves
const PORT = process.env.PORT || 3002;
server.listen(PORT, (req, res) => {
    console.log("Serves started in ", PORT);
});
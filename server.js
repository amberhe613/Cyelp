const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/build')));
server.listen(process.env.PORT, function (err) {
    if (err) {
        console.log("err: app listen");
    } else {
        console.log("app listening");
    }
})

mongoose.connect(process.env.MONGOLAB_URI, function (err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

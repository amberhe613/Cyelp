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

// may follow the codes below to write server codes
/*
server.post("/login", function (req, res) {
    console.log("server receive POST request from /login");

    var userInfo = req.body;
    console.log("userInfo ", userInfo);

    userModel.findOne({ email: userInfo.email }, function (err, doc) {
        if (err) {
            return res.status(400).send({ message: error.message })
        }
        if (doc == null || doc.length == 0) {
            return res.status(400).send({ message: "User not exist" });
        }
        if (doc.password != userInfo.password) {
            return res.status(400).send({ message: "Wrong password" });
        } else {
            return res.send({ message: "Logged in", user: doc });
        }
    })
})
*/
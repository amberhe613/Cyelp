// may follow the codes below to create userModel
/*
let mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('product', productSchema);
*/


var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

// passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
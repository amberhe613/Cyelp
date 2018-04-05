const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');

// schema setup
const UserSchema = new mongoose.Schema({
    oauthID: String,
    username: String,
    photo: String,
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
// passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the
// salt value
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
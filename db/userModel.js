const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');

// schema setup
const UserSchema = new mongoose.Schema({
<<<<<<< HEAD

    oauthID: String,
    username: String,
    photo: String,
=======
    googleId: String,
    username: {type: String, required: true, unique: true},
    photos: String,
>>>>>>> 411113135dc2558055309b162abfbf1cbcd0a756
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
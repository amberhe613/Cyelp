const mongoose = require("mongoose");

// schema setup
const UserSchema = new mongoose.Schema({
    oauthID: {type: String, required: true, unique: true},
    oauthProvider: String,
    username: String,
    photo: String,
    email: String,
    likedRestaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }],
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }],
    reviewedRestaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

module.exports = mongoose.model("User", UserSchema);

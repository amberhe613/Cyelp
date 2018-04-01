const mongoose = require("mongoose");

// schema setup
const reviewSchema = mongoose.Schema({
    text: {type: String, required: true},
    rating: {type: Number, required: true},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        required: true
    }
});

module.exports = mongoose.model("Review", reviewSchema);
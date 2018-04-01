const mongoose = require("mongoose");

// schema setup
const reviewSchema = mongoose.Schema({
    text: {type: String, required: true},
    rating: Number,
    price: Number,
    addedData: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Review", reviewSchema);
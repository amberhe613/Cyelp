const mongoose = require("mongoose");

// schema setup
const reviewSchema = mongoose.Schema({
    text: {type: String, required: true},
    rating: {type: Number, required: true},
    price: {type: Number, required: true},
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("Review", reviewSchema);
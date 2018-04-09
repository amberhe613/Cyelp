const mongoose = require("mongoose");

// schema setup
const reviewSchema = new mongoose.Schema({
    content: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    price: {type: Number},
    _restaurant: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        },
        name: String
    },
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("Review", reviewSchema);

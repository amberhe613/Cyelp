const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    text: {type: String, required: true},
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
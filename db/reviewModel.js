var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
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
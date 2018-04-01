var mongoose = require('mongoose');

// schema setup
var restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
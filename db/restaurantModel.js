const mongoose = require('mongoose');

// schema setup
const restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: String,
    location: String,
    addedDate: {type: Date, default: Date.now},
    averageRating: Number,
    averagePrice: Number,
    _author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
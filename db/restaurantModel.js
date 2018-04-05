const mongoose = require('mongoose');

// schema setup
const restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: String,
    foodType: String,
    location: String,
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
}, {timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);
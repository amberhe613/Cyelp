const mongoose = require('mongoose');

// schema setup
const restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    cuisine: {
        type: String,
        enum : ['Cantonese', 'Sichuan', 'Hunan', 'Fujian', 'Jiangsu', 'Zhejiang', 'Anhui', 'Shandong']
    },
    address: {
        street: String,
        building: String,
        city: String,
        state: String,
        zipcode: String
    },
    phone: String,
    averageRating: Number,
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewsNumber: {type: Number, default: 0},
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    likedUserNumber: {type: Number, default: 0},
    likedUser: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);
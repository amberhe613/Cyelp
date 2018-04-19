const mongoose = require('mongoose');

// schema setup
const restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String},
    cuisine: {
        type: String,
        required: true,
        enum : ['Cantonese', 'Sichuan', 'Hunan', 'Fujian', 'Jiangsu', 'Zhejiang', 'Anhui', 'Shandong']
    },
    address: {
        street: String,
        building: String,
        city: String,
        state: String,
        zipcode: {type: String, required: true}
    },
    description: String,
    averageRating: {type: Number, default: 0},
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
    ],
    deleteRequested: {type: Boolean, default: false},
    updateRequested: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);
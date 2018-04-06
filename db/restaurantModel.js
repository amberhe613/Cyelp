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
const mongoose = require('mongoose');

// schema setup
const restaurantSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: String,
    //https://www.buffalotours.com/blog/guide-to-different-types-chinese-food/
    foodType: {
        type: String,
        enum : ['Cantonese', 'Sichuan', 'Hunan', 'Fujian', 'Jiangsu', 'Zhejiang', 'Anhui', 'Shandong']
    },
    address: String,
    zipCode: String,
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
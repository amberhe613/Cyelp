var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");

// GET findRestaurantsByTag
router.get('/admin/restaurants/update', function (req, res) {
    if (req.user.Role !== "ADMIN") {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .find({
                updateRequested: true
            }, function (err, restaurants) {
                if (restaurants) {
                    var restaurantMap = [];

                    restaurants.forEach(function (restaurant) {
                        restaurantMap.push(restaurant);
                    });
                    res.json({restaurants: restaurantMap});
                } else {
                    res.status(400);
                    res.json({message: "Not Found!"});
                }
            });
    }
});

router.get('/admin/restaurants/delete', function (req, res) {
    if (req.user.Role !== "ADMIN") {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .find({
                deleteRequested: true
            }, function (err, restaurants) {
                if (restaurants) {
                    var restaurantMap = [];

                    restaurants.forEach(function (restaurant) {
                        restaurantMap.push(restaurant);
                    });
                    res.json({restaurants: restaurantMap});
                } else {
                    res.status(400);
                    res.json({message: "Not Found!"});
                }
            });
    }
});

module.exports = router;
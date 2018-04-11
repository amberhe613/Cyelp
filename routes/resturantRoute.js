var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var User = require("../db/userModel");

// POST createRestaurant
router.post('/restaurant/new', function(req, res){
    // Check if all fields are provided and are valid:
    if(!req.body.name || !req.body.address.zipcode){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        var newRestaurant =
            new Restaurant({
                name: req.body.name,
                image: req.body.image,
                cuisine: req.body.cuisine,
                phone: req.body.phone,
                address: {
                    street: req.body.address.street,
                    building: req.body.address.building,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode
                }
            });
        newRestaurant._author = req.user._id;
        newRestaurant.save(function (err) {
            if (err) {
                res.status(400);
                res.json({message: "Bad Request"});
            } else {
                user.restaurants.push(newRestaurant._id);
                user.save();
                res.json({message: "New Restaurant created.", location: "/api/restaurant/" + newRestaurant._id});
            }
        });

    }
});

// POST findRestaurantsByQuery
router.post('/restaurant', function(req, res){
    Restaurant.find(req.body, function (err, restaurants) {
        if (restaurants) {
            var restaurantMap = [];

            restaurants.forEach(function(restaurant){
                restaurantMap.push(restaurant);
            });
            res.json({restaurants: restaurantMap});
        } else {
            res.status(400);
            res.json({message: "Not Found!"});
        }
    });
});
// GET findRestaurantsByUserId
router.get('/user/:userId/createdrestaurants', function(req, res){
    if(!req.params.userId){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant.find({_author:req.params.userId}, function (err, restaurants) {
            if (restaurants) {
                var restaurantMap = [];

                restaurants.forEach(function(restaurant){
                    restaurantMap.push(restaurant);
                });
                res.json({restaurants:restaurantMap});
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
    }
});

// GET findRestaurantByRestaurantId
router.get('/restaurant/:restaurantId', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.params.restaurantId){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant.findById(req.params.restaurantId, function (err, restaurant) {
            if (restaurant) {
                res.json({restaurant: restaurant});
            } else {
                res.status(400);
                res.json({message: "Not Found"});
            }
        });
    }
});

// PUT updateRestaurant
router.put('/restaurant/:restaurantId/edit', function(req, res){
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId
        || !req.body.name) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant.findByIdAndUpdate(req.params.restaurantId, {$set:req.body}, function(err, updateRestaurant){
            if(err){
                res.status(400);
                res.json({message: "Not Found"});
            } else {
                res.json({message: "Restaurant id " + req.params.restaurantId + " updated.",
                    location: "/api/restaurant/" + req.params.restaurantId});
            }
        });
    }
});

// DELETE deleteRestaurant
router.delete('/restaurant/:restaurantId', function(req, res){
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant.findByIdAndRemove(req.params.restaurantId, function (err, deleteRestaurant) {
            if (err) {
                res.status(400);
                res.json({message: "Not found"});
            } else {
                // Delete restaurant in user liked restaurant list
                deleteRestaurant.likedUser.forEach(function(likedUser) {
                    var removeIndex = likedUser.likedRestaurants.map(function(restaurant){
                        return restaurant._id;
                    }).indexOf(deleteRestaurant._id);
                    likedUser.likedRestaurants.splice(removeIndex, 1);
                    likedUser.save();
                });
                // Delete restaurant in user created restaurant list
                var userId = deleteRestaurant._author;
                User.findById(userId, function (err, user) {
                    var removeIndex = user.restaurants.map(function(restaurant){
                        return restaurant._id;
                    }).indexOf(req.params.restaurantId);
                    user.restaurants.splice(removeIndex, 1);
                    user.save();
                    res.send({message: "Restaurant id " + req.params.restaurantId + " removed."});
                });
            }
        });
    }
});

module.exports = router;
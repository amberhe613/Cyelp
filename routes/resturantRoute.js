var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var User = require("../db/userModel");

// POST createRestaurant
router.post('/user/:userId/restaurant', function(req, res){
    // Check if all fields are provided and are valid:
    if(!req.body.name || !req.body.image){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        User.findById(req.params.userId, function (err, user) {
            if (user) {
                var newRestaurant =
                    new Restaurant({
                        name: req.body.name,
                        image: req.body.image,
                        description: req.body.description,
                        location: req.body.location
                    });
                newRestaurant.author.id = user._id;
                newRestaurant.author.name = user.name;
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
            } else {
                res.status(400);
                res.json({message: "Not Found"});
            }
        });
    }
        res.json({message: "Not Found"});
});

// GET findAllRestaurantsForUser
router.get('/user/:userId/restaurant', function(req, res){
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
                res.json(restaurantMap);
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
    }
});

// GET findRestaurantById
router.get('/restaurant/:restaurantId', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.params.restaurantId){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant.findById(req.params.restaurantId, function (err, restaurant) {
            if (restaurant) {
                res.json(restaurant);
            } else {
                res.status(400);
                res.json({message: "Not Found"});
            }
        });
    }
});

// PUT updateRestaurant
router.put('/restaurant/:restaurantId', function(req, res){
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId
        || !req.body.name
        || !req.body.image) {
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

// DELETE deleteUser
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
                var userId = deleteRestaurant.author.id;
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

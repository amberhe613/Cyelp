var express = require('express');
var multer = require('multer');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var User = require("../db/userModel");

// POST createRestaurant
var path = require("path");
var mypath = path.join(__dirname, '../client/public/productImg');
var upload = multer({dest: mypath})
var cloudinary = require("cloudinary")
router.post('/restaurant/new', function (req, res) {
    // Check if all fields are provided and are valid:
    if (!req.body.name || !req.body.zipcode) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        if (req.file) {
            cloudinary
                .uploader
                .upload(req.file, function (result) {
                    console.log(result.url)
                    // result.url is image url
                    var newRestaurant = new Restaurant({
                        name: req.body.name,
                        image: result.url,
                        cuisine: req.body.cuisine,
                        description: req.body.description,
                        address: {
                            street: req.body.street,
                            building: req.body.building,
                            city: req.body.city,
                            state: req.body.state,
                            zipcode: req.body.zipcode
                        }
                    });
                    console.log(newRestaurant)
                });
        } else {
            var newRestaurant = new Restaurant({
                name: req.body.name,
                image: null,
                cuisine: req.body.cuisine,
                description: req.body.description,
                address: {
                    street: req.body.street,
                    building: req.body.building,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zipcode
                }
            });
        }
        newRestaurant._author = req.user._id;
        newRestaurant.save();
        req
            .user
            .restaurants
            .push(newRestaurant._id);
        req
            .user
            .save();
        res.json({
            message: "New Restaurant created.",
            location: "/api/restaurant/" + newRestaurant._id
        });
    }
});

// POST findRestaurantsByQuery
router.post('/restaurant', function (req, res) {
    Restaurant
        .find(req.body, function (err, restaurants) {
            if (restaurants) {
                var restaurantMap = [];

                restaurants.forEach(function (restaurant) {
                    restaurantMap.push(restaurant);
                });
                // console.log("restaurant route 71: ") console.log(restaurantMap)
                res.json({restaurants: restaurantMap});
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
});
// GET findRestaurantsByUserId
router.get('/user/:userId/createdrestaurants', function (req, res) {
    if (!req.params.userId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .find({
                _author: req.params.userId
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

// GET findRestaurantByRestaurantId
router.get('/restaurant/:restaurantId', function (req, res) {
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .findById(req.params.restaurantId, function (err, restaurant) {
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
router.put('/restaurant/:restaurantId/edit', function (req, res) {
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId || !req.body.name) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .findByIdAndUpdate(req.params.restaurantId, {
                $set: req.body
            }, function (err, updateRestaurant) {
                if (err) {
                    res.status(400);
                    res.json({message: "Not Found"});
                } else {
                    res.json({
                        message: "Restaurant id " + req.params.restaurantId + " updated.",
                        location: "/api/restaurant/" + req.params.restaurantId
                    });
                }
            });
    }
});

// PUT delete OR edit
router.put('/restaurant/:restaurantId/mark', function (req, res) {
    // Check if all fields are provided and are valid: console.log("restaurant route
    // 151:") console.log(req.body.deleteRequested)
    // console.log(req.params.restaurantId)
    if (!req.params.restaurantId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .findById(req.params.restaurantId, function (err, restaurant) {
                if (err) {
                    res.status(400);
                    res.json({message: "Not Found"});
                } else {
                    if (req.body.deleteRequested !== null) {
                        restaurant.deleteRequested = req.body.deleteRequested;
                    }
                    if (req.body.updateRequested !== null) {
                        restaurant.updateRequested = req.body.updateRequested;
                    }
                    restaurant.save();
                    res.json({message: "Request send!"})
                }
            });
    }
});

// DELETE deleteRestaurant
router.delete('/restaurant/:restaurantId', function (req, res) {
    console.log("restaurant route 177")
    //Check if all fields are provided and are valid:
    if (!req.params.restaurantId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Restaurant
            .findByIdAndRemove(req.params.restaurantId, function (err, deleteRestaurant) {
                if (err) {
                    res.status(400);
                    res.json({message: "Not found"});
                } else {
                    // Delete restaurant in user liked restaurant list
                    if (deleteRestaurant.likedUser.length >= 1) {
                        deleteRestaurant
                            .likedUser
                            .forEach(function (likedUser) {
                                var removeIndex = likedUser
                                    .likedRestaurants
                                    .map(function (restaurant) {
                                        return restaurant._id;
                                    })
                                    .indexOf(deleteRestaurant._id);
                                likedUser
                                    .likedRestaurants
                                    .splice(removeIndex, 1);
                                likedUser.save();
                            });
                    }
                    // Delete restaurant in user created restaurant list
                    var userId = deleteRestaurant._author;
                    User.findById(userId, function (err, user) {
                        var removeIndex = user
                            .restaurants
                            .map(function (restaurant) {
                                return restaurant._id;
                            })
                            .indexOf(req.params.restaurantId);
                        user
                            .restaurants
                            .splice(removeIndex, 1);
                        user.save();
                        res.send({
                            message: "Restaurant id " + req.params.restaurantId + " removed."
                        });
                    });
                }
            });
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");
var User = require("../db/userModel");

//User like this restaurant
router.post('/restaurant/:restaurantId/like', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, likedRestaurant) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json({
                "error": "restaurant not found"
            });
        } else {
            var curLikedNum = likedRestaurant.likedUserNumber;
            // Push user to restaurant likedUser list
            likedRestaurant.likedUser.push(req.user._id);
            likedRestaurant.reviewsNumber = curLikedNum + 1;
            likedRestaurant.save();

            // Add review to user liked restaurant list
            req.user.likedRestaurants.push(likedRestaurant._id);
            req.user.save();

            res.send({message: "User id " + req.user._id + " like restaurant id " + likedRestaurant._id});
        }
    });
});

//User dislike this restaurant
router.delete('/restaurant/:restaurantId/like', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, dislikedRestaurant) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json({
                "error": "restaurant not found"
            });
        } else {
            // Remove user id in restaurant liked user list
            var removeIndexForRestaurant = dislikedRestaurant.likedUser.map(function(user){
                return user._id;
            }).indexOf(req.user._id);
            var curLikedNum = dislikedRestaurant.likedUserNumber;
            if (removeIndexForRestaurant === -1) {
                res.json({message: "Not found"});
            } else {
                dislikedRestaurant.reviewsNumber = curLikedNum - 1;
                dislikedRestaurant.likedUser.splice(removeIndexForRestaurant, 1);
                dislikedRestaurant.save();

                var removeIndexForUser = req.user.likedRestaurants.map(function(restaurant){
                    return restaurant._id;
                }).indexOf(dislikedRestaurant._id);
                req.user.likedRestaurants.splice(removeIndexForUser, 1);
                req.user.save();

                res.send({message: "User id " + req.user._id + " dislike restaurant id " + dislikedRestaurant._id});
            }
        }
    });
});

// GET findLikedRestaurantsByUserId
router.get('/user/:userId/liked', function(req, res){
    if(!req.params.userId){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        User.findById(req.params.userId, function (err, user) {
            if (user) {
                var restaurantMap = [];

                user.likedRestaurants.forEach(function(restaurant){
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

module.exports = router;
var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var User = require("../db/userModel");

//PUT userSaveRestaurant
router.put('/restaurant/:restaurantId/save', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, likedRestaurant) {
        if (err) {
            res.status(400);
            res.json({
                "error": "restaurant not found"
            });
        } else {
            var existedIndex = likedRestaurant.likedUser.map(function(user){
                return user._id;
            }).indexOf(req.user._id);

            if (existedIndex === -1) {
                var curLikedNum = likedRestaurant.likedUserNumber || 0;
                // Push user to restaurant likedUser list
                likedRestaurant.likedUser.push(req.user._id);
                likedRestaurant.likedUserNumber = curLikedNum + 1;
                likedRestaurant.save();

                // Add Saved to user liked restaurant list
                req.user.likedRestaurants.push(likedRestaurant._id);
                req.user.save();

                res.send({message: "User id " + req.user._id + " like restaurant id " + likedRestaurant._id});

            } else {
                res.status(200);
                res.json({message: "Already liked"});
            }
        }
    });
});

//DELETE userUnsavedRestaurant
router.delete('/restaurant/:restaurantId/unsaved', function (req, res) {
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
                dislikedRestaurant.likedUserNumber = curLikedNum - 1;
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

// GET findSavedRestaurantsByUserId
router.get('/user/:userId/savedrestaurants', function(req, res){
    if(!req.params.userId){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        User.findById(req.params.userId, function (err, user) {
            if (user) {
                var restaurantMap = [];

                user.likedRestaurants.forEach(function(restaurantId){
                    Restaurant.findById(restaurantId, function(err, restaurant) {
                        restaurantMap.push(restaurant);
                    });
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
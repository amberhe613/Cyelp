var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");
var User = require("../db/userModel");

// POST createReview
router.post('/restaurant/:restaurantId/review', function (req, res) {
    Restaurant
        .findById(req.params.restaurantId, function (err, restaurant) {
            if (err) {
                console.log(err);
                res.status(400);
                res.json({"error": "restaurant not found"});
            } else {
                var curReviewNum = restaurant.reviewsNumber;
                var curRatingTotal = (restaurant.averageRating || 0) * curReviewNum;
                var newReview = new Review({
                    content: req.body.content,
                    rating: req.body.rating,
                    price: req.body.price,
                    _restaurant: {
                        id: restaurant._id,
                        name: restaurant.name
                    },
                    _author: {
                        id: req.user._id,
                        name: req.user.username,
                        photo: req.user.photo
                    }
                });
                newReview.save();
                // Add review to restaurant reviews list
                restaurant
                    .reviews
                    .push(newReview._id);
                // update reviews number and calculate avg rate
                restaurant.reviewsNumber = curReviewNum + 1;
                restaurant.averageRating = (parseInt(curRatingTotal) + parseInt(req.body.rating)) / restaurant.reviewsNumber;
                restaurant.save();
                // Add review to user reviews list
                req.user.reviews.push(newReview._id);
                var index = req.user.reviewedRestaurants.indexOf(restaurant._id);
                if (index === -1) {
                    req.user.reviewedRestaurants.push(restaurant._id);
                }
                req.user.save();

                res.send({
                    message: "New Review id " + newReview._id + "created."
                });
            }
        });
});

// GET findReviewedRestaurantsByUserId
router.get('/user/:userId/reviewedrestaurants', function (req, res) {
    if (!req.params.userId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        User.findById(req.params.userId, function (err, user) {
                if (user) {
                    var restaurantMap = [];
                    var visited = 0;

                    for (var i = 0; i < user.reviewedRestaurants.length; i++) {
                        (function (i) {
                            Restaurant
                                .findById(user.reviewedRestaurants[i])
                                .exec(function (err, restaurant) {
                                    visited++;
                                    if (restaurant != null && !restaurantMap.includes(restaurant)) {
                                        restaurantMap.push(restaurant);
                                    }
                                    if (visited === user.reviewedRestaurants.length) {
                                        res.json({restaurants: restaurantMap})
                                    }
                                })
                        })(i)
                    }
                } else {
                    res.status(400);
                    res.json({message: "Not Found!"});
                }
            });
    }
});

// GET findReviewedRestaurantsByUserId
router.get('/user/:userId/reviews', function (req, res) {
    if (!req.params.userId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Review.find({'_author.id': req.params.userId}, function (err, reviews) {
                if (reviews) {
                    var reviewMap = [];

                    reviews.forEach(function (review) {
                        reviewMap.push(review);
                    });
                    res.json({reviews: reviewMap});
                } else {
                    res.status(400);
                    res.json({message: "Not Found!"});
                }
            });
    }
});

// GET findReviewsByRestaurantId
router.get('/restaurant/:restaurantId/reviews', function (req, res) {
    if (!req.params.restaurantId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        Review.find({'_restaurant.id': req.params.restaurantId}, function (err, reviews) {
            if (reviews) {
                var reviewMap = [];

                reviews.forEach(function (review) {
                    reviewMap.push(review);
                });
                res.json({reviews: reviewMap});
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
    }
});

// PUT updateReview
router.put("/review/:reviewId", function (req, res) {
    Review.findById(req.params.reviewId, function (err, updateReview) {
        if (err) {
            res.status(400);
            res.send({"error": "error while updating review"});
        } else {
            if (updateReview != null) {

            }
            var oldRate = updateReview.rating;
            updateReview.content = req.body.content;
            updateReview.rating = req.body.rating;
            updateReview.price = req.body.price;
            updateReview.save();
            Restaurant.findById(updateReview._restaurant.id, function (err, restaurant) {
                var curRatingTotal = (restaurant.averageRating || 0) * restaurant.reviewsNumber;
                restaurant.averageRating = (parseInt(curRatingTotal) + parseInt(req.body.rating) - parseInt(oldRate)) / restaurant.reviewsNumber;
                restaurant.save();
            });

            res.status(200);
            res.send({
                message: "Review id " + req.params.reviewId + "has been updated"
            });
        }
    });
});

//DELETE review
router.delete("/review/:reviewId", function (req, res) {
    //findByIdAndRemove
    Review.findByIdAndRemove(req.params.reviewId, function (err, deletedReview) {
        if (err) {
            res.status(400);
            res.send({"error": "error while deleting review"});
        } else {
            // Remove review id in restaurant reviews list
            Restaurant.findById(deletedReview._restaurant.id, function (err, restaurant) {
                    var curReviewNum = restaurant.reviewsNumber;
                    var curRatingTotal = (restaurant.averageRating || 0) * restaurant.reviewsNumber;
                    var removeIndexForRestaurant = restaurant.reviews.indexOf(req.params.reviewId);
                    if (removeIndexForRestaurant === -1) {
                        res.json({message: "Not found"});
                    } else {
                        if (parseInt(curReviewNum) > 1) {
                            restaurant.reviewsNumber = parseInt(curReviewNum) - 1;
                            restaurant.averageRating = (parseInt(curRatingTotal) - parseInt(deletedReview.rating)) / parseInt(restaurant.reviewsNumber);
                            restaurant.reviews.splice(removeIndexForRestaurant, 1);
                            restaurant.save();
                        } else {
                            restaurant.reviewsNumber = 0;
                            restaurant.averageRating = 0;
                            restaurant.reviews.splice(removeIndexForRestaurant, 1);
                            restaurant.save();
                        }

                        var restaurantReviewMap = [];
                        var visited = 0;
                        var n = req.user.reviews.length;

                        console.log(req.user.reviews.length);
                        for (var i = 0; i < n; i++) {
                            (function (i) {
                                console.log(req.user.reviews[i]);
                                Review.findById(req.user.reviews[i])
                                    .exec(function (err, review) {
                                        visited++;
                                        // console.log(visited);
                                        // console.log(review);
                                        // console.log(restaurant);
                                        if (review != null && review._restaurant._id === restaurant._id) {
                                            restaurantReviewMap.push(review._restaurant._id);
                                            console.log(restaurantReviewMap);
                                        }
                                        if (visited === n) {
                                            console.log(restaurantReviewMap);
                                            if (restaurantReviewMap.length === 0) {
                                                var removeRestaurantIndexForUser = req.user.reviewedRestaurants.indexOf(deletedReview._restaurant.id);
                                                req.user.reviewedRestaurants.splice(removeRestaurantIndexForUser, 1);
                                                req.user.save();
                                            }
                                        }
                                    })
                            })(i)
                        }
                        var removeIndexForUser = req.user.reviews.indexOf(req.params.reviewId);
                        req.user.reviews.splice(removeIndexForUser, 1);
                        req.user.save();
                    }
                });
        }
    });
});

module.exports = router;
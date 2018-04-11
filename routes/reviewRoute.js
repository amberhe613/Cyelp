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
                restaurant.averageRating = (curRatingTotal + req.body.rating) / restaurant.reviewsNumber;
                restaurant.save();
                // Add review to user reviews list
                req.user.reviews.push(newReview._id);
                req.user.reviewedRestaurants.push(restaurant._id);
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

                    user
                        .reviewedRestaurants
                        .forEach(function (restaurant) {
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

// GET findReviewsByUserId
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
                console.log(reviews);
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
            console.log(err);
            res.status(400);
            res.send({"error": "error while updating review"});
        } else {
            var oldRate = updateReview.rating;
            updateReview = req.body;
            Restaurant.findById(updateReview._restaurant.id, function (err, restaurant) {
                var curRatingTotal = (restaurant.averageRating || 0) * restaurant.reviewsNumber;
                restaurant.averageRating = (curRatingTotal + req.body.rating - oldRate) / restaurant.reviewsNumber;
                restaurant.save();
            });
            updateReview.save();
            res.status(200);
            res.send({
                message: "Review id " + req.params.reviewId + "has been updated"
            });
        }
    });
});

//DELETE deleteReview
router.delete("/review/:reviewId", function (req, res) {
    Review
        .findByIdAndRemove(req.params.reviewId, function (err, deletedReview) {
            if (err) {
                res.status(400);
                res.send({"error": "error while deleting review"});
            } else {
                // Remove review id in restaurant reviews list
                Restaurant
                    .findById(deletedReview._restaurant.id, function (err, restaurant) {
                        var curReviewNum = restaurant.reviewsNumber;
                        var curRatingTotal = (restaurant.averageRating || 0) * restaurant.reviewsNumber;
                        var removeIndexForRestaurant = restaurant
                            .reviews
                            .map(function (review) {
                                return review._id;
                            })
                            .indexOf(req.params.reviewId);
                        if (removeIndexForRestaurant === -1) {
                            res.json({message: "Not found"});
                        } else {
                            restaurant.reviewsNumber = curReviewNum - 1;
                            restaurant.averageRating = (curRatingTotal - deletedReview.rating) / restaurant.reviewsNumber;
                            restaurant
                                .reviews
                                .splice(removeIndexForRestaurant, 1);
                            restaurant.save();

                            var removeIndexForUser = req
                                .user
                                .reviews
                                .map(function (review) {
                                    return review._id;
                                })
                                .indexOf(req.params.reviewId);
                            req
                                .user
                                .reviews
                                .splice(removeIndexForUser, 1);
                            req
                                .user
                                .save();
                            var removeRestaurantIndexForUser = req
                                .user
                                .reviewedRestaurants
                                .map(function (restaurant) {
                                    return restaurant._id;
                                })
                                .indexOf(deletedReview._restaurant.id);
                            req
                                .user
                                .reviewedRestaurants
                                .splice(removeRestaurantIndexForUser, 1);
                            req
                                .user
                                .save();

                            res.status(200);
                            res.send({message: "successfully deleted review"});
                        }
                    });
            }
        });
});

module.exports = router;
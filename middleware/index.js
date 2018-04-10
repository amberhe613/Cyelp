var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");
var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Restaurant.findById(req.params.restaurantId, function(err, foundRestaurant) {
            if (err || !foundRestaurant) {
                console.log("Restaurant not found!");
                res.redirect('/login');
            } else {
                // does user own the restaurant
                if (foundRestaurant._author.equals(req.user._id)) {
                    next();
                } else {
                    console.log("User doesn't have permission!");
                    res.redirect('/login');
                }
            }
        });
    } else {
        // not likely to happen, users only able to see edit or delete button only
        // when he/she is the owner
        console.log("User is not logged in!");
        res.redirect('/login');
    }
};

middlewareObj.checkReviewOwnership  = function(req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.reviewId, function(err, foundReview) {
            if (err || !foundReview) {
                console.log("Review not found!");
                res.redirect("back");
            } else {
                // does user own the comment
                if (foundReview._author.equals(req.user._id)) {
                    next();
                } else {
                    console.log("User doesn't have permission!");
                    res.redirect('/login');
                }
            }
        });
    } else {
        // not likely to happen, users only able to see edit or delete button only
        // when he/she is the owner
        console.log("User is not logged in!");
        res.redirect('/login');
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("User is not logged in!");
    res.redirect('/login');
};

module.exports = middlewareObj;
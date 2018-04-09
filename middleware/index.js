var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");
var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Restaurant.findById(req.params.id, function(err, foundRestaurant) {
            if (err || !foundRestaurant) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                // does user own the restaurant
                if (foundRestaurant.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        // not likely happen, users only able to see edit or delete button only
        // when he/she is the owner
        req.flash("error", "You need to login first!");
        res.redirect("back");
    }
};

middlewareObj.checkReviewOwnership  = function(req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.comment_id, function(err, foundReview) {
            if (err || !foundReview) {
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else {
                // does user own the comment
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        // not likely happen, users only able to see edit or delete button only
        // when he/she is the owner
        req.flash("error", "You need to login first!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to login first!");
    res.redirect("/login");
};

module.exports = middlewareObj;
var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");

// create new review
router.post('/restaurants/:restaurantId/reviews', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, restaurant) {
      if (err) {
          console.log(err);
      } else {
          Review.create(req.body.comment, function(err, review){
              if (err) {
                  console.log(err);
              } else {
                  // add user id to review
                  review._author = req.user._id;
                  // save review
                  review.save();
                  console.log(review);
                  res.status(201);
                  res.json({message: "Successfully added comment"});
              }
          })
      }
    })
});

// edit review
router.put("/restaurants/:restaurantId/reviews/:reviewId/edit", function(req, res){
    Review.findByIdAndUpdate(req.params.reviewId, req.body.review, function(err, updatedComment){
        if(err){
            console.log(err);
        } else {
            res.status(200);
            res.json({message: "Successfully updated comment"});
        }
    });
});
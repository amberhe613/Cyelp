var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");

// create new review
router.post('/restaurants/:restaurantId/reviews', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, restaurant) {
      if (err) {
          console.log(err);
          res.status(400);
          res.json({
              "error": "restaurant not found"
          });
      } else {
          var curReviewNum = restaurant.reviewsNumber;
          Review.create(req.body.review, function(err, review){
              // console.log(req.body.review);
              if (err) {
                  console.log(err);
                  res.status(400);
                  res.send({
                      "error": "error while creating review"
                  });
              } else {
                  // add user id to review
                  review._author = req.user._id;
                  // save review
                  review.save();
                  restaurant.reviews.push(review._id);
                  restaurant.reviewsNumber = curReviewNum + 1;
                  req.user.reviews.push(review._id);
                  console.log(review);
                  res.status(201);
                  res.send(review);
              }
          });
      }
    });
});

//
// // edit review
// router.put("/restaurants/:restaurantId/reviews/:reviewId", function(req, res){
//     Review.findByIdAndUpdate(req.params.reviewId, req.body.review, function(err, updatedComment){
//         if(err){
//             console.log(err);
//             res.status(400);
//             res.send({
//                 "error": "error while updating review"
//             });
//         } else {
//             res.status(200);
//             res.send({message: "successfully updated review"});
//         }
//     });
// });
//
// // delete review
// router.delete("/restaurants/:restaurantId/reviews/:reviewId", function(req, res){
//     //findByIdAndRemove
//     Review.findByIdAndRemove(req.params.reviewId, function(err){
//         if(err){
//             res.status(400);
//             res.send({
//                 "error": "error while deleting review"
//             });
//         } else {
//             res.status(200);
//             res.send({message: "successfully deleted review"});
//         }
//     });
// });

module.exports = router;
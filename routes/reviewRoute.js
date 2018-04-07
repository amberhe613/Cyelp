var express = require('express');
var router = express.Router();
var Restaurant = require("../db/restaurantModel");
var Review = require("../db/reviewModel");
var User = require("../db/userModel");

// create new review
router.post('/restaurant/:restaurantId/review', function (req, res) {
    Restaurant.findById(req.params.restaurantId, function(err, restaurant) {
      if (err) {
          console.log(err);
          res.status(400);
          res.json({
              "error": "restaurant not found"
          });
      } else {
          var curReviewNum = restaurant.reviewsNumber;
          var curRatingTotal = (restaurant.averageRating || 0) * curReviewNum;

          console.log(curRatingTotal);
          var newReview =
              new Review({
                  text: req.body.text,
                  rating: req.body.rating,
                  price: req.body.price,
                  _restaurant: {
                      id: restaurant._id,
                      name: restaurant.name
                  }
              });
          newReview._author = req.body.user;
          newReview.save();
          restaurant.reviews.push(newReview._id);
          restaurant.reviewsNumber = curReviewNum + 1;
          restaurant.averageRating = (curRatingTotal + req.body.rating) / (curReviewNum + 1);

          restaurant.save();
          User.findById(req.body.user, function(err, user) {
              user.reviews.push(newReview._id);
              user.save();
          });
          res.send(newReview);
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
var express = require('express');
var router = express.Router();
var User = require("../db/userModel");

// GET findAllRestaurantsByUserId
router.get('/user/:userId', function (req, res) {
    console.log("userroute 7")
    if (!req.params.userId) {
        console.log("userroute 9")
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        console.log("userroute 13")
        User.findById(req.params.userId, function (err, user) {
            console.log("userroute 15")
            if (user) {
                res.json(user);
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var User = require("../db/userModel");

// GET findAllRestaurantsByUserId
router.get('/user/:userId', function (req, res) {
    if (!req.params.userId) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        User.findById(req.params.userId, function (err, user) {
            if (user) {
                res.json(user);
            } else {
                res.status(400);
                res.json({message: "Not Found!"});
            }
        });
    }
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/restaurants');
});

router.get('/admin', function(req, res){
    if (req.session.passport) {
        if (req.user.Role === "USER") {
            res.json({role: 'USER'});
        } else {
            res.json({role: 'ADMIN'});
        }
    } else {
        res.json({role: null})
    }
});

router.get('/account', function (req, res) {
    console.log("hi from account");
    if (req.session.passport) {
        User.findById(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err); // handle errors
            } else if (user !== null) {
                res.json(user);
            } else {
                res.json({_id: null})
            }
        });
    } else {
        res.json({_id: null})
    }
});

module.exports = router;
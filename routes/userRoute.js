var express = require('express');
var router = express.Router();
var User = require("../db/userModel");

// GET findUserByUserId
router.get('/user/:userId', function(req, res){
    if(!req.params.userId){
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

module.exports = router;
const passport = require("passport");
var express = require('express');
var router = express.Router();
var User = require("../db/userModel");

    router.get("/auth/google", passport.authenticate("google", {
        scope: ['profile', 'email']
    }));

    router.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect('/login');
    });

    router.get("/auth/github", passport.authenticate("github", {
        scope: ['profile', 'email']
    }));

    router.get("/auth/github/callback", passport.authenticate("github"), (req, res) => {
        res.redirect('/login');
    });

    router.get('/api/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    router.get('/api/admin', function(req, res){
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

    router.get('/api/account', function (req, res) {
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
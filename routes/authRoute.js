const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
    app.get("/api/googlelogin", (req, res) => {
        res.redirect('/auth/google');
    });

    app.get("/auth/google", passport.authenticate("google", {
        scope: ['profile', 'email']
    }), (req,res)=>{
        console.log(req)
    });

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect('/api/account');
    });

    app.get("/api/githublogin", (req, res) => {
        res.redirect('/auth/github');
    });

    app.get("/auth/github", passport.authenticate("github", {
        scope: ['profile', 'email']
    }));

    app.get("/auth/github/callback", passport.authenticate("github"), (req, res) => {
        res.redirect('/api/account');
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
    });

    // app.get('/api/account', ensureAuthenticated, function (req, res) {
    app.get('/api/account', function (req, res) {
        if (req.session.passport) {
            User
                .findById(req.session.passport.user, function (err, user) {
                    if (err) {
                        console.log(err); // handle errors
                    } else {
                        res.json(user);
                    }
                });
        } else {
            res.json({_id: null})
        }
    });
}

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
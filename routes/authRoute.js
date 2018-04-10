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

<<<<<<< HEAD
    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect('/login');
        }
    );
=======
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect('/api/account');
    });
>>>>>>> c82473a7b87032697a59597d07e50667d66c9dd0

    app.get("/api/githublogin", (req, res) => {
        res.redirect('/auth/github');
    });

    app.get("/auth/github", passport.authenticate("github", {
        scope: ['profile', 'email']
    }));

<<<<<<< HEAD
    app.get(
        "/auth/github/callback",
        passport.authenticate("github"),
        (req, res) => {
            res.redirect('/login');
        }
    );
=======
    app.get("/auth/github/callback", passport.authenticate("github"), (req, res) => {
        res.redirect('/api/account');
    });
>>>>>>> c82473a7b87032697a59597d07e50667d66c9dd0

    app.get("/api/logout", (req, res) => {
        req.logout();
    });

<<<<<<< HEAD
    app.get('/api/account', ensureAuthenticated, function(req, res){
        User.findById(req.session.passport.user, function(err, user) {
            if(err) {
                console.log(err);  // handle errors

            } else {
                res.json(user);
            }
        });
=======
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
>>>>>>> c82473a7b87032697a59597d07e50667d66c9dd0
    });
}

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
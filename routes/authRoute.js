const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
    app.get("/auth/google", passport.authenticate("google", {
        scope: ['profile', 'email']
    }));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect('/login');
    });

    app.get("/auth/github", passport.authenticate("github", {
        scope: ['profile', 'email']
    }));

    app.get("/auth/github/callback", passport.authenticate("github"), (req, res) => {
        res.redirect('/login');
    });

    app.get('/api/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/api/admin', function(req, res){
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

    app.get('/api/account', function (req, res) {
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
}
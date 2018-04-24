var express = require('express');
const passport = require("passport");
var router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect('/login');
});

router.get("/github", passport.authenticate("github", {
    scope: ['profile', 'email']
}));

router.get("/github/callback", passport.authenticate("github"), (req, res) => {
    res.redirect('/login');
});

module.exports = router;
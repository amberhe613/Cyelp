const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model('User');


// Set google OAuth with passport.js
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ oauthID: profile.id});
            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await new User({
                    oauthID: profile.id,
                    username: profile.displayName,
                    oauthProvider: profile.provider,
                    photo: profile.photos[0].value}).save();
                done(null, user);
            }
        }
    )
);

// Set Github OAuth with passport.js
passport.use(
    new GitHubStrategy(
        {
        clientID: keys.githubClientID,
        clientSecret: keys.githubClientSecret,
        callbackURL: "/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ oauthID: profile.id });
            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await new User({
                    oauthID: profile.id,
                    username: profile.displayName,
                    oauthProvider: profile.provider,
                    photo: profile.photos[0].value}).save();
                done(null, user);
            }
        }
    )
);
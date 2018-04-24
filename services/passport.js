const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require("mongoose");
var dotenv = require('dotenv');

dotenv.load();

const User = mongoose.model('User');


// Set google OAuth with passport.js
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
                    email: profile.email,
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
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
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


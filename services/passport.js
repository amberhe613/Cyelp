const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Set google OAuth with passport.js
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log(profile);
            // Google+ API里能拿到的数据
            // { id: '110261448197731138665',
            // displayName: 'Linquan Chen',
            //     name: { familyName: 'Chen', givenName: 'Linquan' },
            // emails: [ { value: 'lqchen613@gmail.com', type: 'account' } ],
            //     photos:
            // [ { value: 'https://lh6.googleusercontent.com/-pOunMsAhSwg/AAAAAAAAAAI/AAAAAAAABdI/gWxX8SAzfC0/photo.jpg?sz=50' } ],
            //     gender: 'male',
            //     provider: 'google',
            //     _raw: '{\n "kind": "plus#person",\n "etag": "\\"EhMivDE25UysA1ltNG8tqFM2v-A/fDu44yMHUptOzUq3bN8kTnyH8KI\\"",\n "gender": "male",\n "emails": [\n  {\n   "value": "lqchen613@gmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "110261448197731138665",\n "displayName": "Linquan Chen",\n "name": {\n  "familyName": "Chen",\n  "givenName": "Linquan"\n },\n "url": "https://plus.google.com/110261448197731138665",\n "image": {\n  "url": "https://lh6.googleusercontent.com/-pOunMsAhSwg/AAAAAAAAAAI/AAAAAAAABdI/gWxX8SAzfC0/photo.jpg?sz=50",\n  "isDefault": false\n },\n "organizations": [\n  {\n   "name": "Zhejiang University",\n   "type": "school",\n   "endDate": "2011",\n   "primary": false\n  }\n ],\n "placesLived": [\n  {\n   "value": "Hangzhou, Zhejiang, China",\n   "primary": true\n  }\n ],\n "isPlusUser": true,\n "language": "en",\n "circledByCount": 9,\n "verified": false\n}\n',
            //     _json:
            // { kind: 'plus#person',
            //     etag: '"EhMivDE25UysA1ltNG8tqFM2v-A/fDu44yMHUptOzUq3bN8kTnyH8KI"',
            //     gender: 'male',
            //     emails: [ [Object] ],
            //     objectType: 'person',
            //     id: '110261448197731138665',
            //     displayName: 'Linquan Chen',
            //     name: { familyName: 'Chen', givenName: 'Linquan' },
            //     url: 'https://plus.google.com/110261448197731138665',
            //         image:
            //     { url: 'https://lh6.googleusercontent.com/-pOunMsAhSwg/AAAAAAAAAAI/AAAAAAAABdI/gWxX8SAzfC0/photo.jpg?sz=50',
            //         isDefault: false },
            //     organizations: [ [Object] ],
            //         placesLived: [ [Object] ],
            //     isPlusUser: true,
            //     language: 'en',
            //     circledByCount: 9,
            //     verified: false } }

const existingUser = await User.findOne({ googleId: profile.id});

            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await new User({googleId: profile.id}).save();
                done(null, user);
            }
        }
    )
);
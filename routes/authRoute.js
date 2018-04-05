const passport = require("passport");

module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ['profile', 'email']
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("facebook"),
        (req, res) => {
            res.redirect("/restaurants");
        }
    );

    app.get(
        "/auth/facebook",
        passport.authenticate("facebook", {
            scope: ['profile', 'email']
        })
    );

    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook"),
        (req, res) => {
        res.redirect("/restaurants");
        }
    );

    app.get(
        "/api/logout",
        (req, res) => {
            req.logout();
            res.redirect('/restaurants');
        }
    );

    app.get(
        "/api/current_user",
        (req, res) => {
            res.send(req.user);
        }
    );
}
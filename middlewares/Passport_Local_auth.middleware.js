const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("../models/User.model");

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, {
                    message: "Incorrect User..."
                });
            } else {
                return done(null, user);
            }
        } catch (err) {
            return done(err)
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
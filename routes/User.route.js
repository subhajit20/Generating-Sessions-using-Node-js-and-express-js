const express = require("express");
const UserRouter = express.Router();
const User = require("../models/User.model");
const { UserMiddleWare } = require("../middlewares/Validators");
const passport = require("passport")

UserRouter.get("/", (req, res) => {
    res.json({
        msg: "This is root path...",
    })
})

UserRouter.get("/register", async(req, res) => {
    res.render("Register");
})

UserRouter.post("/register", UserMiddleWare, (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.save();
        res.redirect('/profile')
    } catch (e) {
        res.redirect('/profile')
    }
})

UserRouter.get("/login", async(req, res) => {
    res.render("Login");
})

UserRouter.post("/login", passport.authenticate('local', {
    failureRedirect: "/login",
    successRedirect: "/profile"
}));

UserRouter.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        const data = req.isAuthenticated();
        console.log(req.user);
        res.render("Profile", {
            user: req.user.username
        });
    } else {
        res.redirect("/register")
    }

})

UserRouter.get("/logout", (req, res) => {
    try {
        req.logOut((err) => {
            if (err) {
                next(err)
            } else {
                res.redirect("/login");
            }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }

})

// UserRouter.post("/login", UserMiddleWare, async(req, res) => {
//     try {
//         const newUser = new User(req.body);
//         newUser.save();
//         res.json({
//             msg: "Registration is successfull..."
//         })
//     } catch (e) {
//         res.json({
//             msg: "Something went wrong..."
//         })
//     }
// })

module.exports = UserRouter;
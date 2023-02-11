const express = require("express");
const UserRouter = express.Router();
const User = require("../models/User.model");
const { UserMiddleWare, Middleware1 } = require("../middlewares/Validators");

UserRouter.get("/", (req, res) => {
    console.log(req.cookies)
    res.json({
        "msg": "This is root path...",
        data: req.session.notimevisited
    })
})

UserRouter.post("/register", UserMiddleWare, async(req, res) => {

    res.json({
        msg: {
            username: req.body.username,
            password: req.body.password
        }
    })
})

module.exports = UserRouter;
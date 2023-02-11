function UserMiddleWare(req, res, next) {
    let reg = /[^1-9]/

    if (reg.test(req.body.username) != true || req.body.password != req.body.confirmpassword) {
        res.status(500).json({
            msg: "Username should not starts with any number"
        })
    } else {
        req.data = "hellowwwww Worldd";
        next()
    }

}

number = 0

function Middleware1(req, res, next) {
    const time = new Date().toLocaleTimeString()
        ++number;
    req.session = {
        data: "Subhajit",
        visited: time.toString(),
        notimevisited: number
    }

    next();
}

module.exports = {
    UserMiddleWare,
    Middleware1
}
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
require("dotenv").config();
const ejs = require("ejs");
const { Middleware1 } = require("./middlewares/Validators")
var session = require('express-session')
const passport = require("passport");
require("./middlewares/Passport_Local_auth.middleware");
const MongoDBStore = require('connect-mongodb-session')(session);
const DbConnect = require("./db");
require('./middlewares/Passport_Local_auth.middleware')
const app = express();
const PORT = process.env.PORT;

DbConnect()
    /**
     * Importing Routers
     */
const UserRouter = require("./routes/User.route");

const dbstring = process.env.MONGO_URI;
const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}




// parse application/json
app.use(bodyParser.json())
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
});


app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 60000
    }
}));

app.use(passport.initialize())
app.use(passport.session())


app.use(UserRouter);

app.listen(PORT, () => { console.log("Server is running at --> http://localhost:3000") })
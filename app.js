const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
require("dotenv").config();
const ejs = require("ejs");
const { Middleware1 } = require("./middlewares/Validators")
var session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const PORT = process.env.PORT;
/**
 * Importing Routers
 */
const UserRouter = require("./routes/User.route");
const { default: mongoose } = require("mongoose");

const dbstring = process.env.MONGO_URI;
const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.createConnection(dbstring, dbOption);


// parse application/json
app.use(bodyParser.json())
const store = new MongoDBStore({
    uri: process.env.SESSION_URI,
    collection: 'sessions',
});
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
}))

app.use(UserRouter);

app.listen(PORT, () => { console.log("Server is running at --> http://localhost:3000") })
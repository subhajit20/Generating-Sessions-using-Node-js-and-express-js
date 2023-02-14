const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set("strictQuery", false);
async function DbConnect() {
    let flag = false;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connectedd")
    } catch (e) {
        flag = true;
    }

    return flag;
}

module.exports = DbConnect
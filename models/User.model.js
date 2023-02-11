const mongoose = require("mongoose");
const date = new Date()

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: String,
        default: date.toLocaleTimeString().toString()
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    notes: Array
})

module.exports = mongoose.model("User", userSchema);

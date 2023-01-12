const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    text: String,
    audio: Blob,
    userID: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model("User", noteSchema);

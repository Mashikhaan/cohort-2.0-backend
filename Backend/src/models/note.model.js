const mongoose = require("mongoose")
/* Schema of note */
const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})


// connect schema to database

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel
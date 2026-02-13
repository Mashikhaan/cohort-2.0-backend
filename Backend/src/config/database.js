/* create database by function */

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connect to the database");
        
    })
}

module.exports = connectToDb
/* Server create
server config 
 */

const express = require("express")
const noteModel = require("./models/note.model")

const app = express() // server create ho chuka
const cors = require("cors")
const path = require("path")
app.use(express.static("./public"))



// middleware
app.use(express.json())
app.use(cors())

/* POST/api/notes */
app.post("/api/notes",async(req,res)=>{
 const {title,description} = req.body
  const note = await noteModel.create({
    title,
    description,
 })
 res.status(201).json({
    message:"note created successfully",
    note
 })
})

/* GET/api/notes */

app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

/* DELETE/api/notes */

app.delete("/api/notes/:id",async(req,res)=>{
    const {id} = req.params
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted successfully"
    })
})


/* PATCH/api/notes */

app.patch("/api/notes/:id",async(req,res)=>{
    const {id} = req.params
    const {title,description} = req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated successfully"
    })

})


// middleware unknown api request 
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public/index.html"))
})


module.exports = app


const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// serve frontend
app.use(express.static(path.join(__dirname, "..", "public")));

/* API routes */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "notes fetched successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "note updated successfully",
  });
});

/* SPA fallback */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

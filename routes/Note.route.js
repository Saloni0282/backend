const express = require("express");
const { NoteModel } = require("../model/Note.model");
require("dotenv").config();
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  console.log(userID);
  const notes = await NoteModel.find({ userID });
  res.send(notes);
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send({ msg: "Note Created" });
  // try {
  //     const note = new NoteModel(payload);
  //     await note.save();
  //     res.send({"msg":"Note Created"})
  // }
  // catch(err){
  //     res.send({"msg":"something wend wrong","err":err.message})
  // }
});
// noteRouter.post("/create", async (req, res) => {
//     const payload = req.body;
//     const new_note = new NoteModel(payload);
//     await new_note.save();
//     res.send({ msg: "Note Created" });
// });


noteRouter.post("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  await NoteModel.findByIdAndUpdate({ _id: noteID });
  res.send({ msg: `Note with id: ${noteID} has been updated` });
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  await NoteModel.findByIdAndDelete({ _id: noteID });
  res.send({ msg: `Note with id: ${noteID} has been deleted` });
});

module.exports = {
  noteRouter
};

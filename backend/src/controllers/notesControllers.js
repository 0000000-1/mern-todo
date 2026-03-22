import Note from "../models/Note.js";

export async function getAllNotes(_, res) { // we can use _ this if we dont use argument
  try {
    const notes = await Note.find().sort({createdAt: -1}); // newest first, casual count 1 
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller");
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.log("Error in getNotebyId controller");
    res.status(500).json({ message: "Internal Server error" });
  }
}


export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller");
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
    // = new Note({title, content});
  } catch (error) {
    console.log("Error in updateNote controller",error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote) return res.status(404).json({message : "Note not found"})
        res.status(200).json({message:"Note deleted successfully!"})
    } catch (error) {
    console.log("Error in deleteNote controller",error);
    res.status(500).json({ message: "Internal Server error" });     
    }
}

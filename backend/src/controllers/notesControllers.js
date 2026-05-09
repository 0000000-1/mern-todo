import Note from "../models/Note.js";

export async function getAllNotes(req, res) { // we can use _ this if we dont use argument
  try {
      const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const notes = await Note.find({userId}).sort({createdAt: -1}); // newest first, casual count 1 
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller");
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, userId } = req.body;
    const note = new Note({ title, content, userId});
 if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }
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
        if(!deletedNote) return res.status(404).json({message : "Note not found"})
        res.status(200).json({message:"Note deleted successfully!"})
    } catch (error) {
    console.log("Error in deleteNote controller",error);
    res.status(500).json({ message: "Internal Server error" });     
    }
}

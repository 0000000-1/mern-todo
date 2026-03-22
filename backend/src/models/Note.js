import mongoose from "mongoose";

// create a schema 
// model based off of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    content:{
        type:String,
        require:true
    }
},{
    timestamps:true // createdAt, updatedAt must add feature
})

const Note = mongoose.model("Note", noteSchema)

export default Note
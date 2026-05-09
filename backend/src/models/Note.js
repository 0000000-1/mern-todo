import mongoose from "mongoose";

// create a schema 
// model based off of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    }, 
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true // createdAt, updatedAt must add feature
})

const Note = mongoose.model("Note", noteSchema)

export default Note
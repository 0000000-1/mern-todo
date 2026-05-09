import mongoose, { model } from "mongoose"
import Note from "./Note.js"

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique: true
   },
   email:{
    type:String,
    required:true,
    unique: true
   },
   password:{
    type:String,
    required:true
   }
},{
    timestamps:true
})
userSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()._id
    try {
        await Note.deleteMany({userId: userId})
        next()
    } catch (err) {
        next(err)
    }
})

const User = mongoose.model('User', userSchema)
export default User
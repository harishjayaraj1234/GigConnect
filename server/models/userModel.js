import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "freelancer", "admin"], default: "freelancer" },
  bio: String,
  skills: [String],
  profileImage: String,
   
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

export default userModel
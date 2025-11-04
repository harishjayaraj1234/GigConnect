import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "freelancer", "admin", "user"],
      default: "user",
    },
    bio: String,
    skills: [String],
<<<<<<< HEAD:gigConnect/server/models/userModel.js
//  profileImage: String,
=======
    profileImage: String,
    isVerified: {type : Boolean, default : false}
>>>>>>> 38afd0be3e5af8f199784db5d9b1a8e51ae0347a:server/models/userModel.js
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
export default userModel;
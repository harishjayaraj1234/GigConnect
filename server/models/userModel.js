import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "freelancer",
    },
    bio: String,
    skills: [String],
    profileImage: String,
  },
  { timestamps: true }
);

<<<<<<< HEAD
const userModel = mongoose.model("user", userSchema);

export default userModel;
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "freelancer", "admin"], default: "" },
  bio: String,
  skills: [String],
  profileImage: String,
   
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

export default userModel
>>>>>>> 8685df037814285e8694df32842517a96114253e

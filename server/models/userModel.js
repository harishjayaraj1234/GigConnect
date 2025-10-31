import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic details
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // User role
    role: {
      type: String,
      enum: ["client", "freelancer", "admin", "user"],
      default: "user",
    },

    // Optional profile info
    bio: { type: String, default: "" },
    skills: { type: [String], default: [] },
    profileImage: { type: String, default: "" },

    // 🔹 Account verification fields
    isAccountVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },

    // 🔹 Forgot password fields
    resetOtp: { type: String, default: "" },
    resetOtpExpiresAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;

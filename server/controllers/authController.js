import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import cloudinary from "../middleware/upload.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===============================
   USER REGISTRATION
================================ */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const skills = "";

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Details..." });
  }

  try {
    const profileImagePath = path.join(__dirname, "..", req.file.path);
    console.log("Uploading to Cloudinary:", profileImagePath);

    const cloudUpload = await cloudinary.uploader.upload(profileImagePath);
    const profileImage = cloudUpload.secure_url;
    console.log("Uploaded Image URL:", profileImage);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      profileImage,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Send Welcome Mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to gigConnect",
      text: `Welcome to gigConnect. Your account has been created with email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json("User Created Successfully....");
  } catch (error) {
    console.error("Error uploading image or creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later",
    });
  }
};

/* ===============================
   USER LOGIN
================================ */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password required..." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In",
      _id: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later",
    });
  }
};

// ✅ Check if user is authenticated (for frontend sessions or tokens)
export const isAuthenticated = async (req, res) => {
  try {
    // If you're using JWT:
    const user = req.user; // user injected by userAuth middleware
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    console.error("isAuthenticated error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ===============================
   LOGOUT
================================ */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===============================
   FORGOT PASSWORD: SEND OTP
================================ */
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // ✅ 10 minutes expiry
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email, // ✅ sends to entered email directly
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. It will expire in 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent:", otp, "to:", email, info.response);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in sendResetOtp:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later",
    });
  }
};

/* ===============================
   VERIFY OTP (Before Password Reset)
================================ */
// export const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp)
//     return res
//       .status(400)
//       .json({ success: false, message: "Email and OTP are required" });

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     if (user.resetOtp !== otp)
//       return res.status(400).json({ success: false, message: "Invalid OTP" });

//     if (user.resetOtpExpireAt < Date.now())
//       return res.status(400).json({ success: false, message: "OTP expired" });

//     return res
//       .status(200)
//       .json({ success: true, message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("verifyOtp error:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("🟡 Received request body:", { email, otp });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(
      "🟢 Comparing provided OTP",
      otp.trim(),
      "with stored OTP",
      user.resetOtp
    );

    if (!user.resetOtp || String(user.resetOtp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt && user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    console.log("✅ OTP verified successfully");
    // ✅ Don't clear OTP here — keep it for password reset
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ===============================
   RESET PASSWORD
================================ */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    console.log("🟡 Received:", { email, otp, password });

    if (!email || !otp || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email, OTP, and password are required",
        });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(
      "🟢 Comparing provided OTP",
      otp.trim(),
      "with stored OTP",
      user.resetOtp
    );

    if (!user.resetOtp || String(user.resetOtp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt && user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // ✅ Hash new password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // ✅ Now clear OTP after successful password reset
    user.resetOtp = null;
    user.resetOtpExpireAt = null;
    await user.save();

    console.log("✅ Password reset successful for", email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

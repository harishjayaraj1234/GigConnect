// import userModel from "../models/userModel.js";

// export const getUserData = async (req,res)=>{
//     try{
//         const {userId} = req.body

//         const user = await userModel.findById(userId)

//         if(!user){
//             return res.json({success:false,message:"user not found..."})

//         }
//         res.json({success:true,
//             userData:{
//             name:user.name,
//             isAccountVerified: user.isAccountVerified,
//             role:user.role

//         }
//     })

//     }catch(error){
//         res.json({success:false,message:error.message})

//     }
// }
import nodemailer from "nodemailer";

// temporary store for OTPs (for testing)
let otpStore = {}; // { email: { otp, expiresAt } }

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user not found..." });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // valid for 5 min
  console.log(`Generated OTP for ${email}: ${otp}`);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error("Mail connection error:", error);
    } else {
      console.log("Mail server ready to send:", success);
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "GigConnect Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore[email];

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  // TODO: replace this with real DB update
  console.log(`✅ Password for ${email} changed to: ${newPassword}`);

  delete otpStore[email];
  res.json({ message: "Password reset successful" });
};

import path from "path";
import cloudinary from "../middleware/upload.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const profileUpdate = async (req, res) => {
  try {
    const { name, location, skills, password, role } = req.body;
    const userId = req.cookies.userId;

    // Validate
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Prepare update data
    let updateData = {};

    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (skills) updateData.skills = skills;
    if (role) updateData.role = role;

    if (req.file) {
      const profileImagePath = path.join(process.cwd(), req.file.path);
      console.log("Uploading to Cloudinary:", profileImagePath);

      const cloudUpload = await cloudinary.uploader.upload(profileImagePath, {
        folder: "gigconnect/profileImages",
      });

      updateData.profileImage = cloudUpload.secure_url;
      console.log("Uploaded Image URL:", updateData.profileImage);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const response = await userModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );

    if (response.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        profileImage: updateData.profileImage,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No changes detected or invalid ID." });
    }
  } catch (error) {
    console.error("Error uploading image or updating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again later" });
  }
};




export const getListUsersData = async (req, res) => {
    try{
        const userId = req.cookies.userId;
        let user;

        const self = await userModel.findById(userId);
        console.log(self);
        if(self.role == 'user'){
            user = await userModel.aggregate([{ $match : { role : "freelancer"}}]);
        }
        else{
            user = await userModel.aggregate([{ $match : { role : "user"}}]);
        }

        if(!user){
            return res.this.status(404).json({success:false,message:"user not found..."})
            
        }
        res.status(200).json({success:true, message : user});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
        
    }
}


export const getUserData = async (req,res)=>{
    try{
        const userId = req.params.id || req.cookies.userId; 
       

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing!" });
        }


        const user = await userModel.findById(userId);

        if(!user){
            return res.this.status(404).json({success:false,message:"user not found..."})
            
        }
        res.status(200).json({success:true, user})

    }catch(error){
        res.status(500).json({success:false,message:error.message})
        
    }
}
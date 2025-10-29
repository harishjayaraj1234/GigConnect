import userModel from "../models/userModel.js";


export const profileUpdate = async (req, res) => {          //done
    try {
        const { name, location, skills, password, role } = req.body;
        
        let updateData = {}

        if(name) updateData.name = name;
        if(location) updateData.location = location;
        if(skills) updateData.skills = skills;
        if(password) updateData.password = password;
        if(role) updateData.role = role;

        const response = await userModel.updateOne(
            { _id : req.cookies.userId},
            { $set : updateData}
        );
        console.log(response);
        
        if(response){
            res.status(200).json({success: true, message : "Updated you Profile"});
        }

    } catch (error) {
         res.status(500).json({success:false,message:error.message})
    }
}




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
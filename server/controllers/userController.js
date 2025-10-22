import userModel from "../models/userModel.js";


export const profileUpdate = async (req, res) => {
    try {
        const { name, location, skills } = 
        userModel.updateOne({})
    } catch (error) {
        
    }
}




export const getUserData = async (req,res)=>{
    try{
        const userId = req.cookies.userId

        const user = await userModel.findById(userId);

        if(!user){
            return res.this.status(404).json({success:false,message:"user not found..."})
            
        }
        res.status(200).json({success:true,
            userData:{
                name:user.name,
                isAccountVerified: user.isAccountVerified,
                role:user.role
            }
        })

    }catch(error){
        res.status(500).json({success:false,message:error.message})
        
    }
}
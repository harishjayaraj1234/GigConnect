import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const userAuth = async(req,res,next)=>{
   const token = req.cookies.token
   
   if(!token){
      return res.json({success:false,message:"Not Authorized Login again..."})
      
   }
   try{
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
      
      if(tokenDecode.id){
         
         const user = await userModel.findById(tokenDecode.id);
         if(!user){
            return res.status(404).json({ success: false, message: "User not found." });
         }
         
         // req.body.userId =  tokenDecode.id
         res.cookie('userId', user._id)
         
      }else{
         return res.json({success:false,message:"Not Authorized..."})
         
      }
       console.log('done')
       next();

    }catch(error){
      res.json({success:false,message:error})

    }
}

export default userAuth;
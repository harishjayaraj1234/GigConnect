import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
<<<<<<< HEAD
    const token = req.headers.authorization?.split("")[1] || req.cookies.token

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized."})
=======
    const token = req.headers.authorization?.split("")[1]

    if(!token){
        return res.status(401).json({success:false,message:"No token provided..."})
>>>>>>> e3189ee76796291d4fe0a8556e92efe6f1808d3b
    }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
            
        }catch(error){
            return res.status(403).json({success:false,message:"Invalid or expired token...."})
        }
 }
<<<<<<< HEAD


=======
>>>>>>> e3189ee76796291d4fe0a8556e92efe6f1808d3b

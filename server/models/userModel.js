import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String, required:true},
    skills:{type:String, default:""},
    verifyOtp:{type:Number,default:0},
    verifyOtpExpireAt:{type:Date,default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Date,default:0},
    profileImage:{type:String}

})

const userModel = mongoose.model('user',userSchema)

export default userModel
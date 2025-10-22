import mongoose from "mongoose"

const connectDB =  (()=>{
     mongoose.connect('mongodb+srv://sarankumar742001:gigconnect123@cluster0.r6ard50.mongodb.net/').then(()=>{
        console.log("DB connected")
    })
    .catch((error)=>{
        console.log("DB not connected....")
    })
})

export default connectDB
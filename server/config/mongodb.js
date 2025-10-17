import mongoose from 'mongoose'

const connectDB = async ()=>{


   await mongoose.connect('mongodb+srv://sarankumar742001:gigconnect123@cluster0.r6ard50.mongodb.net/')
   .then(()=>console.log('MongoDB Connected....')).catch((error)=>console.log(error));

}

export default connectDB
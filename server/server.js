import express from "express"
import cors from "cors"
import env from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import http from 'http'
import {Server} from "socket.io"
import messageModel from "./models/messageModel.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"
import gigsRouter from "./routes/gigsRoutes.js"
import bookingRouter from "./routes/bookingRouter.js";

env.config()
const app = express()
const port = process.env.PORT || 4000
connectDB()


// connecting Server with socket.io
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})


const users = new Map(); // userId -> socketId

io.on('connection',(socket)=>{
    console.log("User Connected", socket.id)


// Register user

socket.on("register",(userId)=>{
    onlineUsers[userId] = socket.id
    console.log(`Registered user ${userId} with socket ${socket.id}`)
})


//private message

socket.on('private_nessage',async ({senderId, receiverId, message})=>{
    const receiverSocketId = users[receiverId]
    if(receiverSocketId){
        io.to(receiverSocketId).emit('private_message',{
            senderId,
            message
        })
    }
    await messageModel.create({ senderId, receiverId, message });

})


// Disconnect 

socket.on('disconnect',()=>{
    console.log("user disconnected:",socket.id);
    for (let [userId, id] of users.entries()) {
        // if(users[userId] === socket.id){
        //     delete users[userId]
        //     break
        // }
        if (id === socket.id) {
        users.delete(userId);
        break;
      }
    }
    console.log('User disconnected:', socket.id);

    
})


})






app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))




// API EndPoints
app.get('/',(req,res)=>res.send("API Working"))

// app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/gigs',gigsRouter)
app.use('/booking', bookingRouter);





server.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})
import express from "express"
import cors from "cors"
import env from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
<<<<<<< HEAD
import http from 'http'
import {Server} from "socket.io"
import messageModel from "./models/messageModel.js"
=======
import { Server } from "socket.io"
import http from 'http'
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"
>>>>>>> fc98b8e (socket logic are added)

env.config()
const app = express()
const port = process.env.PORT || 4000
connectDB()


// connecting Server with socket.io
<<<<<<< HEAD
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
=======

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET','POST']
>>>>>>> fc98b8e (socket logic are added)
    }
})


<<<<<<< HEAD
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
=======
let onlineUsers = {}

io.on('connection',(socket)=>{
    console.log('User connected', socket.id)


// Register user with their userId

socket.on('register',(userId)=>{
    onlineUsers[userId] = socket.id
    console.log(`User ${userId} registered with socket ${socket.id}`)

})


// Handle private message

socket.on('private_message',({senderId,receiverId,message})=>{
    const receiverSocketId = onlineUsers[receiverId]
>>>>>>> fc98b8e (socket logic are added)
    if(receiverSocketId){
        io.to(receiverSocketId).emit('private_message',{
            senderId,
            message
        })
    }
<<<<<<< HEAD
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




=======
})


// Handle disconnect

socket.on('dissconnect',()=>{
    console.log('user disconnected:', socket.id)
    for(const userId in onlineUsers){
        if(onlineUsers[userId] === socket.id){
            delete onlineUsers[userId]
            break
        }
    }
})

})


>>>>>>> fc98b8e (socket logic are added)
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))




<<<<<<< HEAD

// API EndPoints
app.get('/',(req,res)=>res.send("API Working"))
=======
// API EndPoints
app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
>>>>>>> fc98b8e (socket logic are added)



server.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})
import express from "express"
import cors from "cors"
import env from "dotenv"
import http from "http"
import {Server} from "socket.io"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import { Server } from "socket.io"
import http from 'http'
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"

env.config()
const app = express()
const port = process.env.PORT
connectDB()


// connecting Server with socket.io

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET','POST']
    }
})


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
    if(receiverSocketId){
        io.to(receiverSocketId).emit('private_message',{
            senderId,
            message
        })
    }
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


app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))




const server = http.createServer(app)
const io = new server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})


let onlineUsers = {}

io.on('connection',(socket)=>{
    console.log("User Connected", socket.id)


// Register user

socket.on("register",(userId)=>{
    onlineUsers[userId] = socket.id
    console.log(`Registered user ${userId} with socket ${socket.id}`)
})


//private message

socket.on('private_nessage',({senderId, receiverId, message})=>{
    const receiverSocketId = onlineUsers[receiverId]
    if(receiverSocketId){
        io.to(receiverSocketId).emit('private_message',{
            senderId,
            message
        })
    }
})


// Disconnect 

socket.on('disconnect',()=>{
    console.log("user disconnected:",socket.id);
    for(const userId in onlineUsers){
        if(onlineUsers[userId] === socket.id){
            delete onlineUsers[userId]
            break
        }
    }
    
})


})



// API EndPoints
app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)



server.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})
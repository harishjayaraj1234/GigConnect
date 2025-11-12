import express from "express"
import cors from "cors"
import env from "dotenv"
import { createServer } from 'http';
import { Server } from "socket.io";
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"
import gigsRouter from "./routes/gigsRoutes.js"
import reviewRouter from  "./routes/reviewRouter.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import bookingRouter from "./routes/bookingRouter.js";
import socketHandler from "./socket/socketHandler.js"
import Razorpay from "razorpay"
import paymentRouter from "./routes/paymentRoutes.js"
import walletRouter from "./routes/walletRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"


env.config()
const app = express()
const port = process.env.PORT
connectDB()



const server = createServer(app); 
const io = new Server(server, {
    cors: {
        origin : process.env.CLIENT_URL,
        methods : ["GET", "POST"],
        credentials : true
    }
});

socketHandler(io);

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,  
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true               
}));


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


app.use('/api/auth', corsMiddleware, authRouter);
app.use('/api/user', corsMiddleware, userRouter);
app.use('/api/gigs', corsMiddleware, gigsRouter);
app.use('/booking', corsMiddleware, bookingRouter);
app.use('/reviews', corsMiddleware, reviewRouter);
app.use('/chat', corsMiddleware, chatRoutes);
app.use('/api/wallet', corsMiddleware, walletRouter);
app.use('/api/payment', corsMiddleware, paymentRouter);


server.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})

<<<<<<< HEAD
import express from "express";
import cors from "cors";
import env from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import gigsRouter from "./routes/gigsRoutes.js";
import reviewRouter from "./routes/reviewRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import socketHandler from "./socket/socketHandler.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));
=======
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
import bookingRouter from "./routes/bookingRouter.js";
import socketHandler from "./socket/socketHandler.js"


env.config()
const app = express()
const port = process.env.PORT || 3000
connectDB()

const server = createServer(app); 
const io = new Server(server, {
    cors: {
        origin : "http://localhost:5173",
        methods : ["GET", "POST"],
        credentials : true
    }
});

socketHandler(io);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({credentials:true}))

// Razorpay logic
import Razorpay from "razorpay"
import paymentRouter from "./routes/paymentRoutes.js"
import walletRouter from "./routes/walletRoutes.js";


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});
>>>>>>> 8685df037814285e8694df32842517a96114253e

// Razorpay logic
import Razorpay from "razorpay";
import paymentRouter from "./routes/paymentRoutes.js";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// API EndPoints
// app.get('/',(req,res)=>res.send("API Working"))
<<<<<<< HEAD
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/gigs", gigsRouter);
app.use("/booking", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/api/payment", paymentRouter);

server.listen(port, () => {
  console.log(`Server Stared on PORT:${port}`);
});
=======
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/gigs',gigsRouter)
app.use('/booking', bookingRouter);
app.use('/reviews', reviewRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/wallet",walletRouter)

server.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})
>>>>>>> 8685df037814285e8694df32842517a96114253e

import express from "express"
import cors from "cors"
import env from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"
import gigsRouter from "./routes/gigsRoutes.js"
import bookingRouter from "./routes/bookingRouter.js";

env.config()
const app = express()
const port = process.env.PORT
connectDB()


app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))



// API EndPoints
// app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/gigs',gigsRouter)
app.use('/booking', bookingRouter);


app.listen(port,()=>{
    console.log(`Server Stared on PORT:${port}`)
})
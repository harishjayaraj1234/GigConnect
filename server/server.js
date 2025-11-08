import express from "express";
import env from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import gigsRouter from "./routes/gigsRoutes.js";
import reviewRouter from "./routes/reviewRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import paymentRouter from "./routes/paymentRoutes.js";
import walletRouter from "./routes/walletRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import socketHandler from "./socket/socketHandler.js";
import createCorsMiddleware from "./middleware/corsMiddleware.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://gigconnect-dev.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

socketHandler(io);

app.use(express.json());
app.use(cookieParser());
app.use(
  createCorsMiddleware({
    allowedOrigins: [
      "http://localhost:5173",
      "https://gigconnect-dev.onrender.com",
    ],
    credentials: true,
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/gigs", gigsRouter);
app.use("/booking", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/chat", chatRoutes);
app.use("/api/wallet", walletRouter);
app.use("/api/payment", paymentRouter);

server.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});

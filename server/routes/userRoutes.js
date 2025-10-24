// import express from 'express'
// import userAuth from '../middleware/userAuth.js'
// import { getUserData } from '../controllers/userController.js'

// const userRouter = express.Router()

// userRouter.get('/data',userAuth,getUserData)

// export default userRouter

import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  forgotPassword,
  verifyOtp,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOtp);

export default userRouter;

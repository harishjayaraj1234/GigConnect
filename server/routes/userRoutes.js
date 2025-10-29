<<<<<<< HEAD
import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  profileUpdate,
  getListUsersData,
} from "../controllers/userController.js";
=======
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { getUserData, profileUpdate,  getListUsersData } from '../controllers/userController.js'
>>>>>>> 8685df037814285e8694df32842517a96114253e

const userRouter = express.Router();

<<<<<<< HEAD
userRouter.get("/data", userAuth, getUserData); //personal information
userRouter.get("/data/:id", userAuth, getUserData); //user information
userRouter.get("/data/all-user", userAuth, getListUsersData); // all Opposite role users
userRouter.put("/profile-update", userAuth, profileUpdate); // update personal profile
=======
userRouter.get('/data', userAuth, getUserData);     //personal information
userRouter.get('/data/:id', userAuth, getUserData);  //user information
userRouter.get('/data/all-user',userAuth,getListUsersData);    // all Opposite role users 
userRouter.put('/profile-update', userAuth, profileUpdate);     // update personal profile
>>>>>>> 8685df037814285e8694df32842517a96114253e

export default userRouter;

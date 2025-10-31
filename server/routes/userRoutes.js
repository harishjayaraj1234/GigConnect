import express from 'express'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'
import { getUserData, profileUpdate,  getListUsersData } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);     //personal information
userRouter.get('/data/:id', getUserData);  //user information
userRouter.get('/data/all-user',userAuth,getListUsersData);    // all Opposite role users 
userRouter.put('/profile-update', userAuth, upload.single("profileImage"), profileUpdate);     // update personal profile


export default userRouter;

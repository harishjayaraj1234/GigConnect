import express from 'express'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'
import { getUserData, profileUpdate,  getListUsersData } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);     
userRouter.get('/data/:id', userAuth, getUserData);  
userRouter.get('/data/all-user',userAuth,getListUsersData);    
userRouter.put('/profile-update', userAuth, upload.single("profileImage"), profileUpdate);    


export default userRouter;

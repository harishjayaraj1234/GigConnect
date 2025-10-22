import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { getUserData, profileUpdate } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/data',userAuth,getUserData);
userRouter.put('/profile-update', userAuth, profileUpdate);

export default userRouter
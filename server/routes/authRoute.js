import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js'
import userAuth from '../middleware/userAuth.js'


const authRouter = express.Router()

authRouter.post('/register',register)   //done
authRouter.post('/login',login)     //done
authRouter.post('/logout',logout)   //done
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp)  //done
authRouter.post('/verify-account',userAuth,verifyEmail) //done
authRouter.post('/is-auth', userAuth,isAuthenticated)     //not understand // it is used to check user currently loggedin or not
authRouter.post('/send-reset-otp',sendResetOtp)     //done
authRouter.post('/reset-password',resetPassword)    //done






export default authRouter
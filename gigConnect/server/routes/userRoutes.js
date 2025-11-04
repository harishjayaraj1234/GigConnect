import express from 'express'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'
import { getUserData, profileUpdate,  getListUsersData , allUsers, deleteUser} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);     //personal information
userRouter.get('/data/:id', getUserData);  //user information
userRouter.get('/data/all-user',userAuth, getListUsersData);    // all Opposite role users 
userRouter.get('/admin/data/all', allUsers);    // all users 
userRouter.delete('/admin/delete/:id', deleteUser)
userRouter.put('/profile-update', userAuth, upload.single("profileImage"), profileUpdate);     // update personal profile


<<<<<<< HEAD:gigConnect/server/routes/userRoutes.js
export default userRouter;
=======



export default userRouter;
>>>>>>> 38afd0be3e5af8f199784db5d9b1a8e51ae0347a:server/routes/userRoutes.js

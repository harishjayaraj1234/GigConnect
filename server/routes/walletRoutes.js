import express from "express"
import { withdrawFunds } from "../controllers/walletController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const walletRouter = express.Router()

walletRouter.post('/withdraw',verifyToken,withdrawFunds)

export default walletRouter
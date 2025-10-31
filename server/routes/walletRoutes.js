import express from "express";
import { depositFunds, withdrawFunds } from "../controllers/walletController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const walletRouter = express.Router();

walletRouter.post('/withdraw', verifyToken,withdrawFunds)
walletRouter.post('/deposit', verifyToken,depositFunds)


export default walletRouter;

import express from "express"
import { checkoutPayment, paymentVerification } from "../controllers/paymentController.js"

const paymentRouter = express.Router()

paymentRouter.post("/checkout", checkoutPayment);
paymentRouter.post("/verify", paymentVerification);

export default paymentRouter

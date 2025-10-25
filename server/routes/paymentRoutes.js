import express from "express"
import { checkoutPayment } from "../controllers/paymentController.js"

const paymentRouter = express.Router()

paymentRouter.post('/checkout',checkoutPayment)

export default paymentRouter
<<<<<<< HEAD
import express from "express";
import {
  checkoutPayment,
  getKey,
  verification,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", checkoutPayment);
paymentRouter.get("/getkey", getKey);
paymentRouter.post("/verification", verification);

export default paymentRouter;
=======
import express from "express"
import { checkoutPayment, getKey, verification } from "../controllers/paymentController.js"

const paymentRouter = express.Router()

paymentRouter.post('/create-order',checkoutPayment)
paymentRouter.get('/getkey',getKey)
paymentRouter.post('/verification',verification)


export default paymentRouter
>>>>>>> 8685df037814285e8694df32842517a96114253e

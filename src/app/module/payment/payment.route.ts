import express from "express";
import { PaymentControllers } from "./payment.controller";
import bodyParser from "body-parser";

const router = express.Router();
router.post("/checkout", PaymentControllers.checkout);
router.post("/webhook", PaymentControllers.savePaymentData);

export const PaymentRoutes = router;

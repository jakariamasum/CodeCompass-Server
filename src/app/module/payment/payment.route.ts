import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();
router.post("/checkout", PaymentControllers.checkout);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentControllers.savePaymentData
);

export const PaymentRoutes = router;

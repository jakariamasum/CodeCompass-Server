import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();
router.post("/checkout", PaymentControllers.checkout);

export const PaymentRoutes = router;

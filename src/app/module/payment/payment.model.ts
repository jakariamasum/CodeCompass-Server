import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>({
  paymentId: { type: String },
  amount: { type: Number },
  currency: { type: String },
  customerEmail: { type: String },
  status: { type: String },
  subscriptionId: { type: String },
});

export const Payment = model<IPayment>("Payment", PaymentSchema);

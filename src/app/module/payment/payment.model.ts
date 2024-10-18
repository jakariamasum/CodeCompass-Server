import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>({
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  customerEmail: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  subscriptionId: { type: String, required: true },
});

export const Payment = model<IPayment>("Payment", PaymentSchema);

import { Types } from "mongoose";

export interface IPayment extends Document {
  paymentId: string;
  amount: number;
  currency: string;
  customerEmail: Types.ObjectId;
  status: string;
  subscriptionId: string;
}

import { model, Schema } from "mongoose";
import { IPasswordRecover } from "./passwor-recover.interface";

const PasswordRecoverSchema = new Schema<IPasswordRecover>(
  {
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
export const PasswordRecover = model<IPasswordRecover>(
  "PasswordRecover",
  PasswordRecoverSchema
);

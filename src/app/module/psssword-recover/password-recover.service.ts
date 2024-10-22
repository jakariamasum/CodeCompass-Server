import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { PasswordRecover } from "./password-recover.model";
import config from "../../../config";

class RecoveryService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.nodemailer_user as string,
        pass: config.nodemailer_pass as string,
      },
    });
  }

  async generateRecoveryCode(email: string): Promise<string> {
    const code = uuidv4().slice(0, 6).toUpperCase();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await PasswordRecover.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    await this.sendRecoveryEmail(email, code);

    return code;
  }

  async verifyRecoveryCode(email: string, code: string): Promise<boolean> {
    const recoveryCode = await PasswordRecover.findOne({ email, code });

    if (!recoveryCode || new Date() > recoveryCode.expiresAt) {
      return false;
    }

    await PasswordRecover.deleteOne({ _id: recoveryCode._id });
    return true;
  }

  private async sendRecoveryEmail(email: string, code: string): Promise<void> {
    const resetLink = `https://code-compass-client.vercel.app/verify-password?code=${code}&email=${encodeURIComponent(
      email
    )}`;
    await this.transporter.sendMail({
      from: '"CodeCompass" <admin@codecompass.com>',
      to: email,
      subject: "Password Recovery Code",
      text: `Your password recovery code is: ${code}. This code will expire in 15 minutes.`,
      html: `<p>Your password recovery code is: <strong>${code}</strong></p>
             <p>This code will expire in 15 minutes.</p>
             <p>Please click the following link to verify and update your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });
  }
}

export default new RecoveryService();

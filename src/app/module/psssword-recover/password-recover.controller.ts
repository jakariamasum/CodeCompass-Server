import { Request, Response } from "express";
import passwordRecoverService from "./password-recover.service";
import { UserServices } from "../user/user.service";
import AppError from "../../errors/AppError";

class RecoveryController {
  async requestRecoveryCode(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = await UserServices.getSingleUserFromDB(email);
      if (!user) {
        throw new AppError(404, "User does not exits");
      }

      const result = await passwordRecoverService.generateRecoveryCode(email);
      res
        .status(200)
        .json({ message: "Recovery code sent successfully", result });
    } catch (error) {
      console.error("Error generating recovery code:", error);
      res.status(500).json({ message: "Error sending recovery code" });
    }
  }

  async verifyRecoveryCode(req: Request, res: Response): Promise<void> {
    try {
      const { email, code } = req.body;
      console.log(req.body);
      const isValid = await passwordRecoverService.verifyRecoveryCode(
        email,
        code
      );

      if (isValid) {
        res
          .status(200)
          .json({ message: "Recovery code verified successfully" });
      } else {
        res.status(400).json({ message: "Invalid or expired recovery code" });
      }
    } catch (error) {
      console.error("Error verifying recovery code:", error);
      res.status(500).json({ message: "Error verifying recovery code" });
    }
  }
}

export default new RecoveryController();

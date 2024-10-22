import express from "express";
import passwordRecoverController from "./password-recover.controller";

const router = express.Router();

router.post("/request-code", passwordRecoverController.requestRecoveryCode);
router.post("/verify-code", passwordRecoverController.verifyRecoveryCode);

export const recoverRoutes = router;

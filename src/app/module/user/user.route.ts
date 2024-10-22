import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UservalidationSchemas } from "./user.validate";
import { UserControllers } from "./user.controller";
import {
  authMiddleware,
  isAdminMiddleware,
} from "../../middlewares/authMiddleware";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UservalidationSchemas.createUserValidationSchema),
  UserControllers.createUser
);
router.post("/login", UserControllers.signIn);
router.get("/", UserControllers.getAllUsers);
router.get("/:email", UserControllers.getSingleUser);
router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  UserControllers.toogleUser
);
router.put(
  "/role/:id",
  authMiddleware,
  isAdminMiddleware,
  UserControllers.toogleUserRole
);
router.put(
  "/role/verify/:id",
  authMiddleware,
  isAdminMiddleware,
  UserControllers.toogleUserVerify
);
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  UserControllers.deleteUser
);

// user routes
router.put("/profile/:id", authMiddleware, UserControllers.updateUser);
router.post("/follow/:userId", authMiddleware, UserControllers.followUser);
router.post("/password-update", UserControllers.updateUserPassword);
export const UserRoutes = router;

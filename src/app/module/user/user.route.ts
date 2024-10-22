import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UservalidationSchemas } from "./user.validate";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UservalidationSchemas.createUserValidationSchema),
  UserControllers.createUser
);
router.post("/login", UserControllers.signIn);
router.get("/", UserControllers.getAllUsers);
router.get("/:email", UserControllers.getSingleUser);
router.put("/:id", UserControllers.toogleUser);
router.put("/role/:id", UserControllers.toogleUserRole);
router.put("/role/verify/:id", UserControllers.toogleUserVerify);
router.delete("/:id", UserControllers.deleteUser);

// user routes
router.put("/profile/:id", UserControllers.updateUser);
router.post("/follow/:userId", UserControllers.followUser);
router.post("/password-update", UserControllers.updateUserPassword);
export const UserRoutes = router;

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidationSchemas } from "./post.validate";
import { PostControllers } from "./post.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(PostValidationSchemas.createPostValidationSchema),
  PostControllers.createPost
);

export const PostRoutes = router;

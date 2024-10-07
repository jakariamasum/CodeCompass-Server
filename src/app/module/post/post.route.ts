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
router.get("/", PostControllers.getAllPosts);
router.get("/:id", PostControllers.getSinglePost);
router.put("/:id", PostControllers.updatePost);

export const PostRoutes = router;

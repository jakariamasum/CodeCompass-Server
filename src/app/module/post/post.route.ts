import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidationSchemas } from "./post.validate";
import { PostControllers } from "./post.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();
router.post(
  "/",
  validateRequest(PostValidationSchemas.createPostValidationSchema),
  authMiddleware,
  PostControllers.createPost
);
router.get("/", PostControllers.getAllPosts);
router.get("/:id", PostControllers.getSinglePost);
router.put("/:id", authMiddleware, PostControllers.updatePost);
router.delete("/:id", authMiddleware, PostControllers.deletePost);

// user routes
router.get("/user-post/:id", PostControllers.getUserPosts);
router.put("/likes/:id", PostControllers.likePost);
router.put("/dislikes/:id", PostControllers.disLikePost);

export const PostRoutes = router;

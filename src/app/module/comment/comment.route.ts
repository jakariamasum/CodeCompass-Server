import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CommentvalidationSchemas } from "./comment.validate";
import { CommentControllers } from "./comment.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(CommentvalidationSchemas.createCommentValidationSchema),
  CommentControllers.createComment
);
router.get("/", CommentControllers.getAllComments);
router.get("/:id", CommentControllers.getSinglePostComments);

export const CommentRoutes = router;

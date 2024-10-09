import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const { user, post } = req.body;
  const existingUser = await User.findById(user);
  if (!existingUser) {
    throw new AppError(404, "User does not exits");
  }
  const existingPost = await Post.findById(post);
  if (!existingPost) {
    throw new AppError(404, "Post does not exits");
  }

  const result = await CommentServices.createCommentIntoDB(req.body);
  if (!result) {
    throw new AppError(400, "Comment creation failed");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment created successfully!!",
    data: result,
  });
});

const getAllComments = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllComments();
  if (!result) {
    throw new AppError(404, "No comments available!");
  }
  sendResponse(res, {
    success: true,
    message: "Comments retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getSinglePostComments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.getSinglePostCommentsFromDB(
    id as string
  );
  if (!result) {
    throw new AppError(404, "No comments available!");
  }
  sendResponse(res, {
    success: true,
    message: "Comments retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getAllComments,
  getSinglePostComments,
};

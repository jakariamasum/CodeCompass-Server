import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { User } from "../user/user.model";

const createPost = catchAsync(async (req, res) => {
  const { user } = req.body;
  const existingUser = await User.findById(user);
  if (!existingUser) {
    throw new AppError(404, "User does not exits");
  }

  const result = await PostServices.createPostInDB(req.body);
  if (!result) {
    throw new AppError(400, "Post creation failed");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post created successfully!!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB();
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  sendResponse(res, {
    success: true,
    message: "Posts retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id as string);
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  sendResponse(res, {
    success: true,
    message: "Post retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
};

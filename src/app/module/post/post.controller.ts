import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { User } from "../user/user.model";

const createPost = catchAsync(async (req, res) => {
  console.log("hit post", req.body);
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

const getUserPosts = catchAsync(async (req, res) => {
  const { user } = req.query;
  const result = await PostServices.getUserPostsFromDB(user as string);
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

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updatePostIntoDb(id as string, req.body);
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  console.log(result);
  sendResponse(res, {
    success: true,
    message: "Post updated sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFromDb(id as string);
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  console.log(result);
  sendResponse(res, {
    success: true,
    message: "Post deleted sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const likePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.likePostIntoDB(id as string);
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  console.log(result);
  sendResponse(res, {
    success: true,
    message: "Post likes sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const disLikePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.disLikePostIntoDB(id as string);
  if (!result) {
    throw new AppError(404, "No posts available!");
  }
  console.log(result);
  sendResponse(res, {
    success: true,
    message: "Post disLikes sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  disLikePost,
};

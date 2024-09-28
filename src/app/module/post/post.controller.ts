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

export const PostControllers = {
  createPost,
};

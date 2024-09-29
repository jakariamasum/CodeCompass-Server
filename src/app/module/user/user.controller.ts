import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError";

const createUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.isUserExists(email);
  if (user) {
    throw new AppError(404, "User already exits!");
  }
  const result = await UserServices.createUserInDB(req.body);
  if (!result) {
    throw new AppError(404, "User not created");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  if (!result) {
    throw new AppError(404, "No users exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrived sucessfully!!",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result = await UserServices.getSingleUserFromDB(email as string);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrived sucessfully!!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};

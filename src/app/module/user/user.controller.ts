import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/tokenGenerateFunction";
import config from "../../../config";
import bcrypt from "bcrypt";
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

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserServices.signInIntoDB(email, password);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const accessToken = createToken(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      fname: user.fname,
      lname: user.lname,
    },
    config.jwt_secret as string,
    config.jwt_expires as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful!",
    data: { accessToken },
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
  const { email } = req.params;
  console.log(email);
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

const toogleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.toogleUserIntoDB(id as string);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated sucessfully!!",
    data: result,
  });
});
const toogleUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.toogleUserRoleIntoDB(id as string);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated sucessfully!!",
    data: result,
  });
});
const toogleUserVerify = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.toogleUserVerifyIntoDB(
    id as string,
    req.body
  );
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User verified!!",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log("up id", id);
  const result = await UserServices.updateUserIntoDB(id as string, req.body);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  console.log("update", result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated sucessfully!!",
    data: result,
  });
});

const followUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.body;
  const result = await UserServices.followUserIntoDB(userId, followerId);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User follows sucessfully!!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id as string);
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted sucessfully!!",
    data: result,
  });
});

const updateUserPassword = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log("up id", req.body);
  const hashedPass = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await UserServices.updateUserPasswordIntoDB(
    email as string,
    hashedPass
  );
  if (!result) {
    throw new AppError(404, "No user exits!");
  }
  console.log("update", result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated sucessfully!!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  signIn,
  getAllUsers,
  getSingleUser,
  toogleUser,
  deleteUser,
  updateUser,
  toogleUserRole,
  toogleUserVerify,
  followUser,
  updateUserPassword,
};

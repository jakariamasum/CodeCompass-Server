import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/tokenGenerateFunction";
import config from "../../../config";
import nodemailer from "nodemailer";
import { PasswordResetToken } from "./user.interface";

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

const recoverPassword = catchAsync(async (req, res) => {
  const passwordResetTokens: { [email: string]: PasswordResetToken } = {};

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 3600000);
    console.log(token, expires);

    passwordResetTokens[email] = { token, expires };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 467,
      secure: true,
      auth: {
        user: "jakaria.ict22@gmail.com",
        pass: "fjgf nyjc bozy ehlh",
      },
    });

    await transporter.sendMail({
      from: "admin@codecompass.com",
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click this link to reset your password: https://code-compass-client.vercel.app/reset-password?token=${token}&email=${email}`,
      html: `<p>You requested a password reset. Click this link to reset your password:</p><p><a href="https://code-compass-client.vercel.app/reset-password?token=${token}&email=${email}">Reset Password</a></p>`,
    });

    res.status(200).json({ message: "Recovery email sent" });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).json({ message: "Error sending recovery email" });
  }
});

export const UserControllers = {
  createUser,
  signIn,
  getAllUsers,
  getSingleUser,
  toogleUser,
  deleteUser,
  updateUser,
  recoverPassword,
  toogleUserRole,
  toogleUserVerify,
  followUser,
};

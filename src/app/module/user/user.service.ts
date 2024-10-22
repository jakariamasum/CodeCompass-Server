import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";

const createUserInDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
const signInIntoDB = async (email: string, password: string) => {
  console.log("hit");
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email })
    .populate("followers")
    .populate("following");
  return result;
};

const toogleUserIntoDB = async (id: string) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return null;
  }
  const status = user.active ? false : true;
  const result = await User.findByIdAndUpdate({ _id: id }, { active: status });
  return result;
};
const toogleUserRoleIntoDB = async (id: string) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return null;
  }
  const newRole = user.role === "admin" ? "user" : "admin";
  const result = await User.findByIdAndUpdate({ _id: id }, { role: newRole });
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const followUserIntoDB = async (userId: string, followerId: string) => {
  const session = await User.startSession();
  session.startTransaction();
  console.log(userId, followerId);

  try {
    // Update User 1 to add User 2 to their following array
    const user1Update = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: new Types.ObjectId(followerId) } },
      { new: true, session }
    );

    // Update User 2 to add User 1 to their followers array
    const user2Update = await User.findByIdAndUpdate(
      followerId,
      { $addToSet: { followers: new Types.ObjectId(userId) } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return { user1Update, user2Update };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(404, "Error while following");
  }
};

const toogleUserVerifyIntoDB = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return null;
  }
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const updateUserPasswordIntoDB = async (email: string, password: string) => {
  const user = await User.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
  return user;
};

export const UserServices = {
  createUserInDB,
  signInIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  toogleUserIntoDB,
  deleteUserFromDB,
  updateUserIntoDB,
  followUserIntoDB,
  toogleUserRoleIntoDB,
  toogleUserVerifyIntoDB,
  updateUserPasswordIntoDB,
};

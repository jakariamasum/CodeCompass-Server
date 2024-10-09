import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

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
  const result = await User.findOne({ email });
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

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findById({ _id: id }, payload, { new: true });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const followUserIntoDB = async (userId: string, follower: string) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $addToSet: { followers: new Types.ObjectId(follower) } },
    { new: true }
  );
  return result;
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
};

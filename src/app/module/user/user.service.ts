import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUserInDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
const signInIntoDB = async (email: string, password: string) => {
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

export const UserServices = {
  createUserInDB,
  signInIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};

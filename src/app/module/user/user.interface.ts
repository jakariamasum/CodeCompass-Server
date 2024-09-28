import { Model, Types } from "mongoose";

export interface IUser {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    profilePic: string;
    role: 'user' | 'admin';
    following: Types.ObjectId[];
    followers: Types.ObjectId[];
    verified: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
  }
  
  export interface UserModel extends Model<IUser> {
    isUserExists(email: string): Promise<IUser | null>;
  }
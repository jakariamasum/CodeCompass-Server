import { Types } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  post: Types.ObjectId;
  likes: number;
  dislikes: number;
}

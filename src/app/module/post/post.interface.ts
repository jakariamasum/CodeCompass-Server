import { Types } from "mongoose";
import { IComment } from "../comment/comment.interface";

export interface IPost {
  user: Types.ObjectId;
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: IComment[];
}

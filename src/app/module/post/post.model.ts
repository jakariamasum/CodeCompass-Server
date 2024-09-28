import { model, Schema } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", PostSchema);

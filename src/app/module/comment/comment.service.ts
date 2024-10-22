import mongoose from "mongoose";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { Post } from "../post/post.model";

const createCommentIntoDB = async (payload: IComment) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newComment = await Comment.create([payload], { session });

    const result = await Post.findByIdAndUpdate(
      payload.post,
      { $push: { comments: newComment[0]._id } },
      { new: true, session }
    );
    console.log(result);
    await session.commitTransaction();

    return newComment[0];
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  } finally {
    session.endSession();
  }
};

const getAllComments = async () => {
  const result = await Comment.find();
  return result;
};
const getSinglePostCommentsFromDB = async (id: string) => {
  const result = await Comment.find({ post: id }).populate("user");
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getAllComments,
  getSinglePostCommentsFromDB,
};

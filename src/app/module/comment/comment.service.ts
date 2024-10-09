import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: IComment) => {
  const result = await Comment.create(payload);
  return result;
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

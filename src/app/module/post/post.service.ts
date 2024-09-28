import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostInDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

export const PostServices = {
  createPostInDB,
};

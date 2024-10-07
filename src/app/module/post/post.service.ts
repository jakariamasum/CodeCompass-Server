import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostInDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find();
  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById({ _id: id });
  return result;
};

const updatePostIntoDb = async (id: string, payload: Partial<IPost>) => {
  const result = await Post.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deletePostFromDb = async (id: string) => {
  const result = await Post.findByIdAndDelete({ _id: id });
  return result;
};

export const PostServices = {
  createPostInDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDb,
  deletePostFromDb,
};

import { Mongoose, Schema } from "mongoose";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostInDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find().populate("user");
  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById({ _id: id }).populate("user");
  return result;
};

const getUserPostsFromDB = async (id: string) => {
  console.log(1233333);
  console.log("userid", id);
  const result = await Post.find({ user: id });
  console.log(result);
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

const likePostIntoDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    { _id: id },
    { $inc: { likes: 1 } }
  );
  return result;
};
const disLikePostIntoDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    { _id: id },
    { $inc: { dislikes: 1 } }
  );
  return result;
};

export const PostServices = {
  createPostInDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDb,
  deletePostFromDb,
  getUserPostsFromDB,
  likePostIntoDB,
  disLikePostIntoDB,
};

const { v4: uuid } = require("uuid");
const postModel = require("../database/postModel");

const getAllPosts = async (filterParams) => {
  try {
    const allPosts = await postModel.getAllPosts(filterParams);

    return allPosts;
  } catch (error) {
    throw error;
  }
};

const getOnePost = async (postId) => {
  try {
    const post = await postModel.getOnePost(postId);
    return post;
  } catch (error) {
    throw error;
  }
};

const getPostForUser = async (userId) => {
  try {
    const posts = await postModel.getPostForUser(userId);
    return posts;
  } catch (error) {
    throw error;
  }
};

const createNewPost= async (newPost) => {
  const postToInsert = {
    ...newPost,
    post_id: uuid(),
    post_likes: 0,
    created_at: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdPost = await postModel.createNewPost(postToInsert);
    return createdPost;
  } catch (error) {
    throw error;
  }
};

const updateOnePost = async (postId, changes) => {
  try {
    const updatedPost = await postModel.updateOnePost(postId, changes);
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

const deleteOnePost = async (postId) => {
  try {
    await postModel.deleteOnePost(postId);
  } catch (error) {
    throw error;
  }
};

const deletePostForUser = async (userId) => {
  try {
    await postModel.deletePostForUser(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  getPostForUser,
  createNewPost,
  updateOnePost,
  deleteOnePost,
  deletePostForUser
};

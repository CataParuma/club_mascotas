const { v4: uuid } = require("uuid");
const commentModel = require("../database/commentModel");

const getAllComments = async () => {
  try {
    const allComments = await commentModel.getAllComments();

    return allComments;
  } catch (error) {
    throw error;
  }
};

const getOneComment = async (commentId) => {
  try {
    const comment = await commentModel.getOneComment(commentId);
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentForUser = async (userName) => {
  try {
    const comments = await commentModel.getCommentForUser(userName);
    return comments;
  } catch (error) {
    throw error;
  }
};

const getCommentForPost = async (postId) => {
  try {
    const comments = await commentModel.getCommentForPost(postId);
    return comments;
  } catch (error) {
    throw error;
  }
};

const createNewComment = async (newComment) => {
  const commentToInsert = {
    ...newComment,
    comment_id: uuid(),
    comment_likes: 0,
    created_at: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdComment = await commentModel.createNewComment(commentToInsert);
    return createdComment;
  } catch (error) {
    throw error;
  }
};

const updateOneComment = async (commentId, changes) => {
  try {
    const updatedComment = await commentModel.updateOneComment(commentId, changes);
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

const deleteOneComment = async (commentId) => {
  try {
    await commentModel.deleteOneComment(commentId);
  } catch (error) {
    throw error;
  }
};

const deleteCommentForPost = async (postId) => {
  try {
    await commentModel.deleteCommentForPost(postId);
  } catch (error) {
    throw error;
  }
};

const deleteCommentForUser = async (userId) => {
  try {
    await commentModel.deleteCommentForUser(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCommentForUser,
  getCommentForPost,
  getAllComments,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
  deleteCommentForPost,
  deleteCommentForUser
};

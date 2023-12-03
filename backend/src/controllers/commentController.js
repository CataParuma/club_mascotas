const commentService = require('../services/commentService');

  const getAllComments = async (req, res) => {
    try {
      const allComments = await commentService.getAllComments();
      res.send({ status: "OK", data: allComments });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const getOneComment = async (req, res) => {
    const {
      params: { commentId },
    } = req;
    if (!commentId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':commentId' can not be empty" },
      });
    }
    try {
      const comment = await commentService.getOneComment(commentId);
      if (comment != "") res.send({ status: "OK", data: comment });
      else
        res.status(400).send({
          status: "FAILED",
          data: { error: "No exist comment with that comment_id" },
        });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getCommentForUser = async (req, res) => {
    const {
      params: { userName},
    } = req;
    if (!userName ){
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userName' can not be empty" },
      });
    }
    try {
      const comments = await commentService.getCommentForUser(userName);
      if (comments != "") res.send({ status: "OK", data: comments });
      else
        res.status(400).send({
          status: "FAILED",
          data: { error: "No exist comment of that user" },
        });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getCommentForPost = async (req, res) => {
    const {
      params: { postId },
    } = req;
    if (!postId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':postId' can not be empty" },
      });
    }
    try {
      const comments = await commentService.getCommentForPost(postId);
      if (comments != "") res.send({ status: "OK", data: comments });
      else
        res.status(400).send({
          status: "FAILED",
          data: { error: "No exist comment in that post" },
        });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const createNewComment = async (req, res) => {
    const { body } = req;

  if (
    !body.comment_content ||
    !body.user_name ||
    !body.post_id
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'comment_content', 'user_name', 'post_id'",
      },
    });
    return;
  }

  const newComment= {
    comment_content: body.comment_content,
    user_name: body.user_name,
    post_id: body.post_id
  };

  try {
    const createdComment = await commentService.createNewComment(newComment);
    res.status(201).send({ status: "OK", data: createdComment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  };
  
  const updateOneComment = async (req, res) => {
    const {
      body,
      params: { commentId },
    } = req;
    if (!commentId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':commentId' can not be empty" },
      });
    }
  
    try {
      const updatedComment = await commentService.updateOneComment(commentId, body);
      res.send({ status: "OK", data: updatedComment });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const deleteOneComment = async (req, res) => {
    const {
      params: { commentId },
    } = req;
    if (!commentId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':commentId' can not be empty" },
      });
    }
  
    try {
      await commentService.deleteOneComment(commentId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteCommentForPost = async (req, res) => {
    const {
      params: { postId },
    } = req;
    if (!postId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':postId' can not be empty" },
      });
    }
  
    try {
      await commentService.deleteCommentForPost(postId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteCommentForUser = async (req, res) => {
    const {
      params: { userId },
    } = req;
    if (!userId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
    }
  
    try {
      await commentService.deleteCommentForUser(userId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
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
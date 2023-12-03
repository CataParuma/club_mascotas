const postService = require("../services/postService");

const getAllPosts = async (req, res) => {

  const { post_type } = req.query;
  try {
    const allPosts = await postService.getAllPosts({ post_type });
    res.send({ status: "OK", data: allPosts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOnePost = async (req, res) => {
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
    const post = await postService.getOnePost(postId);
    if (post != "") res.send({ status: "OK", data: post });
    else
      res.status(400).send({
        status: "FAILED",
        data: { error: "No exist post with that post_id" },
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getPostForUser = async (req, res) => {
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
    const posts = await postService.getPostForUser(userId);
    if (posts != "") res.send({ status: "OK", data: posts });
    else
      res.status(400).send({
        status: "FAILED",
        data: { error: "No exist post of that user" },
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewPost = async (req, res) => {
  const { body } = req;

  if (
    !body.post_title ||
    !body.post_content ||
    !body.post_type ||
    !body.src_image ||
    !body.pet_type ||
    !body.pet_age ||
    !body.pet_info ||
    !body.pet_gender ||
    !body.user_id
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'post_title', 'post_content', 'post_type', 'src_image', 'pet_type', 'user_id'",
      },
    });
    return;
  }

  const newPost = {
    post_title: body.post_title,
    post_content: body.post_content,
    post_type: body.post_type,
    src_image: body.src_image,
    pet_type: body.pet_type,
    pet_age: body.pet_age,
    pet_info: body.pet_info,
    pet_gender: body.pet_gender,
    user_id: body.user_id,
  };

  try {
    const createdPost = await postService.createNewPost(newPost);
    res.status(201).send({ status: "OK", data: createdPost });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOnePost = async (req, res) => {
  const {
    body,
    params: { postId },
  } = req;
  if (!postId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':postId' can not be empty" },
    });
  }

  try {
    const updatedPost = await postService.updateOnePost(postId, body);
    res.send({ status: "OK", data: updatedPost });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOnePost = async (req, res) => {
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
    await postService.deleteOnePost(postId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deletePostForUser = async (req, res) => {
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
    await postService.deletePostForUser(userId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getPostForUser,
  getAllPosts,
  getOnePost,
  createNewPost,
  updateOnePost,
  deleteOnePost,
  deletePostForUser
};

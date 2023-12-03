const express = require('express');
const router = express.Router();
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getOnePost);
router.get("/:postId/comments", commentController.getCommentForPost);
router.post("/", postController.createNewPost);
router.patch("/:postId", postController.updateOnePost);
router.delete("/:postId", postController.deleteOnePost);
router.delete("/:postId/comments", commentController.deleteCommentForPost);

module.exports = router;
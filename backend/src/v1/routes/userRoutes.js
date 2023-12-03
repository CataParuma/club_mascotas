const express = require("express");
const userController = require("../../controllers/userController");
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getOneUser);
router.get("/:userId/comments",  commentController.getCommentForUser);
router.get("/:userId/posts", postController.getPostForUser);
router.post("/register", userController.createNewUser);
router.post("/login", userController.loginUser);
router.patch("/:userId", userController.updateOneUser);
router.delete("/:userId", userController.deleteOneUser);
router.delete("/:userId/comments",  commentController.deleteCommentForUser);
router.delete("/:userId/posts", postController.deletePostForUser);

module.exports = router;

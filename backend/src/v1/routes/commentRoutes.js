const express = require('express');
const router = express.Router();
const commentController = require("../../controllers/commentController");

router.get("/", commentController.getAllComments);
router.get("/:commentId", commentController.getOneComment);
router.post("/", commentController.createNewComment);
router.patch("/:commentId", commentController.updateOneComment);
router.delete("/:commentId", commentController.deleteOneComment);
  
module.exports = router;
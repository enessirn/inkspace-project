const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticateToken = require("../middlewares/authenticateToken ");

router.post("/add-comment/:postId", authenticateToken, commentController.addComment);

module.exports = router;
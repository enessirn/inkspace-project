const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middlewares/authenticateToken ");

router.post("/create-post", authenticateToken, postController.createPost);
router.get("/", authenticateToken, postController.getAllPosts);


module.exports = router;
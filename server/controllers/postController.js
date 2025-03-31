const Post = require("../models/Posts")

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newPost = new Post({ title, content, author: req.user._id });
    await newPost.save();
    console.log("New Post Created:", newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
    console.log("Error creating post:", error);
  }
};


exports.getAllPosts = async (req, res) => {
const Post = require("../models/Posts");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User ID:", req.user.id);
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });
    await newPost.save();
    console.log("New Post Created:", newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
    console.log("Error creating post:", error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    .populate("author", "username fullname email profilePicture");
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    console.log("Fetched Posts:", posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

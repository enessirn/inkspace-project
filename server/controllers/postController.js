const Post = require("../models/Posts");
const User = require("../models/User");

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
    // adding post to user as array
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        posts: [{
          _id: newPost._id,
          title: req.body.title,
          content: req.body.content,
        }]
      },
    });
    await newPost.save();
    console.log("New Post Created:", newPost);
    res.status(200).json(newPost);
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

exports.deletePost = async (req, res) => {
  console.log("Post ID to delete:", req.params.id);
  try {
    const id = req.params.id;
    // 67fab0b9d1da6e371c248b37
    
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // remove post from user as array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        posts: {
          _id: id,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
}
const Post = require("../models/Posts");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });
    await newPost.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: newPost._id }
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
    console.log("Error creating post:", error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username fullname email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username profilePicture"
        }
      });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};


// like/unlike the post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(postId);;
    if (!post)
      return res.status(404).json({ message: "Post not found!" });

    const alreadyLiked = post.likes.some(id => id.toString() === userId);
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
      if (post.likesCount > 0) post.likesCount -= 1;
      await post.save();
      return res.status(200).json({ message: "Post unliked", likeCount: post.likesCount });
    }

    post.likes.push(userId);
    post.likesCount += 1;
    await post.save();
    return res.status(200).json({ message: "Post liked", likeCount: post.likesCount });

  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post" });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        posts: {
          _id: id,
        },
      },
    });
    console.log("Post deleted successfully:", post);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
}

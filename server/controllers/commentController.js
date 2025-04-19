const Post = require("../models/Posts");
const Comment = require("../models/Comments");

exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const { text } = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Comment text is required." });
        }

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = new Comment({
            post: postId,
            author: userId,
            text,
        });

        await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id }
        });
        await post.save();

        return res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

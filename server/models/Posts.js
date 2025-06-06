const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    likesCount: {
      type: Number,
      default: 0
    },
    comments: [{  type: mongoose.Schema.Types.ObjectId, ref: "Comments" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

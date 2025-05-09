const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      default: `https://picsum.photos/200/300?random=1`,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    posts: [
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
     }
    ],
  },
  {
    timestamps: true,
  }
);
// when password updating
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

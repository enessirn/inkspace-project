const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 2000);
  };
  const { fullname, username, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      fullname,
      username,
      email,
      password,
      profilePicture: `https://picsum.photos/200/300?random=${getRandomNumber()}`,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email & Password not correct" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Email & Password not correct" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 168 * 60 * 60 * 1000,
    });
    console.log("TOKEN", token);
    res.status(200).json({ message: "Logged in successfully", user, token });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Error logging in" });
  }
};
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
  window.location.href = "/login";
  console.log("Logged out successfully");
};

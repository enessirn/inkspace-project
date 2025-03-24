const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
dotenv.config();
const authenticateToken = require("./middlewares/authenticateToken ");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb baglandş"))
  .catch((err) => console.log("Mongodb baglantisi basarisiz ", err));

app.use("/auth", authenticateToken, authRoutes);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to InkSpace");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "'Access Denied, No Token Provided" });
  }
  console.log("Token:", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = {id: user.id};
    console.log("Decoded User:", user);
    next();
  });
};

module.exports = authenticateToken;

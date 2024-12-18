const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { USER, ADMIN } = require("../constants");

// Middleware to verify token
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check roles
const admin = (req, res, next) => {
  if (req.user && req.user.role === ADMIN) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

const user = (req, res, next) => {
  if (req.user && req.user.role === USER) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, user only" });
  }
};

module.exports = { protect, admin, user };

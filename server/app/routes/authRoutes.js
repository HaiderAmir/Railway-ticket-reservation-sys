const express = require("express");
const {
  registerUser,
  loginUser,
  me,
  updateMe,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, me);
router.put("/update", protect, updateMe);

module.exports = router;

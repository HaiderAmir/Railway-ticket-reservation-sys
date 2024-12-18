const express = require("express");
const router = express.Router();
const {
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
  updateFeedback,
  addFeedback,
} = require("../controllers/feedbackController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.post("/", addFeedback);
router.get("/", protect, admin, getFeedbacks);
router.get("/:id", protect, admin, getFeedbackById);
router.put("/:id", protect, admin, updateFeedback);
router.delete("/:id", protect, admin, deleteFeedback);

module.exports = router;

const express = require("express");
const { getAnalytics, getReports } = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/analytics", protect, admin, getAnalytics);
router.get("/reports", protect, admin, getReports);

module.exports = router;

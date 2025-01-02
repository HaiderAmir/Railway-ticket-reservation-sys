const express = require("express");
const { protect, user } = require("../middlewares/authMiddleware");
const { createPaymentSession } = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-session", protect, user, createPaymentSession);

module.exports = router;

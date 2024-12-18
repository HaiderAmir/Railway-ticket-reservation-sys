const express = require("express");
const {
  addTrain,
  getAllTrains,
  updateTrain,
  deleteTrain,
} = require("../controllers/trainController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, admin, addTrain);
router.get("/", protect, getAllTrains);
router.put("/:id", protect, admin, updateTrain);
router.delete("/:id", protect, admin, deleteTrain);

module.exports = router;

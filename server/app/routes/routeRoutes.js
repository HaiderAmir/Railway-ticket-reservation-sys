const express = require("express");
const {
  addRoute,
  updateRoute,
  deleteRoute,
  getRoutes,
} = require("../controllers/routeController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, admin, addRoute);
router.put("/:id", protect, admin, updateRoute);
router.delete("/:id", protect, admin, deleteRoute);
router.get("/", getRoutes);

module.exports = router;

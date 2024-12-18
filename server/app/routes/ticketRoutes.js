const express = require("express");
const {
  bookTicket,
  cancelTicket,
  getUserTickets,
  changeTicketStatus,
  getAllTickets,
  deleteTicket,
} = require("../controllers/ticketController");
const { protect, user, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, user, bookTicket);
router.delete("/:id", protect, user, cancelTicket);
router.get("/", protect, user, getUserTickets);
router.put("/:id", protect, admin, changeTicketStatus);
router.get("/all", protect, admin, getAllTickets);
router.delete("/delete/:id", protect, admin, deleteTicket);

module.exports = router;

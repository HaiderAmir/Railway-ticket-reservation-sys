const QRCode = require("qrcode");
const Ticket = require("../models/Ticket");
const { CANCELLED } = require("../constants");

// Book a ticket
const bookTicket = async (req, res) => {
  const { trainId, date, seatNumber } = req.body;

  try {
    // Check if seat is available
    const existingTicket = await Ticket.findOne({
      train: trainId,
      date,
      seatNumber,
    });
    if (existingTicket)
      return res.status(400).json({ message: "Seat is already booked" });

    // Generate QR Code
    const qrCodeData = `TrainID: ${trainId}, Date: ${date}, Seat: ${seatNumber}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Create and save ticket
    const ticket = await Ticket.create({
      user: req.user._id,
      train: trainId,
      date,
      seatNumber,
      qrCode,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a ticket
const cancelTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status: CANCELLED },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({ message: "Ticket cancelled", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets for a user
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate("train");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Change ticket status
const changeTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({ message: "Ticket status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("train")
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookTicket,
  cancelTicket,
  getUserTickets,
  changeTicketStatus,
  getAllTickets,
  deleteTicket,
};
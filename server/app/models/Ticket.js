const mongoose = require("mongoose");
const { BOOKED, CANCELLED } = require("../constants");

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    date: { type: Date, required: true },
    seatNumber: { type: Number, required: true },
    status: { type: String, enum: [BOOKED, CANCELLED], default: BOOKED },
    qrCode: { type: String },
    paymentIntent: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);

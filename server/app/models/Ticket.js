const mongoose = require("mongoose");
const { BOOKED, CANCELLED, CONFIRMED } = require("../constants");

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
    status: { type: String, enum: [BOOKED,  CONFIRMED,
      CANCELLED], default: BOOKED },
    qrCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);

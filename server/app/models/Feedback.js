const mongoose = require("mongoose");
const { PENDING, RESOLVED } = require("../constants");

const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: [PENDING, RESOLVED], default: PENDING },
  response: { type: String },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

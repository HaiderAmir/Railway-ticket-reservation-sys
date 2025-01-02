const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  route: {
    start: { type: String, required: true },
    end: { type: String, required: true },
    stops: [{ type: String }],
  },
  timings: {
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
  },
  capacity: { type: Number, required: true },
  pricePerSeat: { type: Number, required: true },
});

module.exports = mongoose.model("Train", trainSchema);

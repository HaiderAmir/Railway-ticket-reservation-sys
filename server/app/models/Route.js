const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
});

const routeSchema = new mongoose.Schema(
  {
    trainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    stops: [stopSchema],
    totalDistance: { type: Number, required: true },
    routeName: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;

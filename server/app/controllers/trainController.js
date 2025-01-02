const Train = require("../models/Train");

// Add a new train
const addTrain = async (req, res) => {
  const { trainID, name, route, timings, capacity, pricePerSeat } = req.body;
  try {
    const trainExists = await Train.findOne({ trainID });
    if (trainExists)
      return res.status(400).json({ message: "Train ID already exists" });

    const train = await Train.create({
      trainID,
      name,
      route,
      timings,
      capacity,
      pricePerSeat,
    });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update train details
const updateTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findByIdAndUpdate(id, req.body, { new: true });
    if (!train) return res.status(404).json({ message: "Train not found" });

    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a train
const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findByIdAndDelete(id);
    if (!train) return res.status(404).json({ message: "Train not found" });

    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTrain, updateTrain, deleteTrain, getAllTrains };

const Route = require("../models/Route");

// Add a new route
const addRoute = async (req, res) => {
  const { trainId, stops, totalDistance, routeName } = req.body;

  try {
    const route = await Route.create({
      trainId,
      stops,
      totalDistance,
      routeName,
    });
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a route
const updateRoute = async (req, res) => {
  const { id } = req.params;
  const { stops, totalDistance, routeName, active } = req.body;

  try {
    const route = await Route.findByIdAndUpdate(
      id,
      { stops, totalDistance, routeName, active },
      { new: true }
    );

    if (!route) return res.status(404).json({ message: "Route not found" });
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a route
const deleteRoute = async (req, res) => {
  const { id } = req.params;

  try {
    const route = await Route.findByIdAndDelete(id);

    if (!route) return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all routes
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("trainId", "name");
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRoute, updateRoute, deleteRoute, getRoutes };

const { USER } = require("../constants");
const Ticket = require("../models/Ticket");
const Train = require("../models/Train");
const User = require("../models/User");

// Get dashboard analytics
const getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: USER });
    const trainCount = await Train.countDocuments();
    const bookingCount = await Ticket.countDocuments();

    const amount = await Ticket.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      userCount,
      trainCount,
      bookingCount,
      totalRevenue: amount ? amount[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking and cancellation reports
const getReports = async (req, res) => {
  try {
    const reports = await Ticket.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics, getReports };

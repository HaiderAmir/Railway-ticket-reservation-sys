const Feedback = require("../models/Feedback");

// Get all feedback
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

// Add feedback
const addFeedback = async (req, res) => {
  const { user, subject, message, rating } = req.body;

  try {
    const feedback = new Feedback({
      user,
      subject,
      message,
      rating,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback added successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: "Error adding feedback", error });
  }
};

// Update feedback
const updateFeedback = async (req, res) => {
  const { status, response } = req.body;

  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    if (status) feedback.status = status;
    if (response) feedback.response = response;

    await feedback.save();
    res
      .status(200)
      .json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: "Error updating feedback", error });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};

module.exports = {
  getFeedbacks,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};

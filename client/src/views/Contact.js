import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/feedbacks`,
        {
          user: formData.name,
          subject: "Contact Us Feedback",
          message: formData.message,
          rating: 5, // Default rating
        }
      );

      console.log("Feedback Submitted:", response.data);

      setFormData({ name: "", email: "", message: "" });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#1976d2" }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Have a question, feedback, or need help? Reach out to us!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Submit Feedback
        </Button>
      </form>
      <Snackbar
        open={feedbackSubmitted}
        autoHideDuration={4000}
        onClose={() => setFeedbackSubmitted(false)}
      >
        <Alert
          onClose={() => setFeedbackSubmitted(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

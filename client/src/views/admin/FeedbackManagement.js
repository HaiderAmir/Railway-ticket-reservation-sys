import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { RESOLVED } from "../../constants";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/feedbacks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || "");
    setFeedbackDialogOpen(true);
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleResolveFeedback = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/feedbacks/${selectedFeedback._id}`,
        {
          status: RESOLVED,
          response,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setFeedbacks(
        feedbacks.map((fb) =>
          fb._id === selectedFeedback._id
            ? { ...fb, status: RESOLVED, response }
            : fb
        )
      );
      setFeedbackDialogOpen(false);
    } catch (error) {
      console.error("Error resolving feedback:", error);
    }
  };

  const handleCloseDialog = () => {
    setFeedbackDialogOpen(false);
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredFeedbacks(feedbacks);
      return;
    }
    const filtered = feedbacks.filter((fb) =>
      fb.message.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Feedback Management</h1>

      <TextField
        label="Search Feedback"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFeedbacks.map((feedback) => (
            <TableRow key={feedback._id}>
              <TableCell>{feedback.user}</TableCell>
              <TableCell>{feedback.subject}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{feedback.message}</TableCell>
              <TableCell>{new Date(feedback.date).toLocaleString()}</TableCell>
              <TableCell>{feedback.status}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewFeedback(feedback)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={feedbackDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Feedback Detail</DialogTitle>
        <DialogContent>
          <p>
            <strong>User:</strong> {selectedFeedback?.user}
          </p>
          <p>
            <strong>Subject:</strong> {selectedFeedback?.subject}
          </p>
          <p>
            <strong>Rating:</strong> {selectedFeedback?.rating}
          </p>
          <p>
            <strong>Message:</strong> {selectedFeedback?.message}
          </p>
          <p>
            <strong>Status:</strong> {selectedFeedback?.status}
          </p>

          <TextField
            label="Admin Response"
            variant="outlined"
            fullWidth
            value={response}
            onChange={handleResponseChange}
            multiline
            rows={4}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleResolveFeedback} color="primary">
            Mark as Resolved
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const TicketBookingScreen = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [date, setDate] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [error, setError] = useState("");

  const fetchTrains = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/trains`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setTrains(data);
    } catch (error) {
      setError("Error fetching train data");
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleBookTicket = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/tickets`,
        {
          trainId: selectedTrain,
          date,
          seatNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setMessage(`Ticket booked successfully!`);
      setQRCode(data.qrCode);
    } catch (error) {
      setQRCode("");
      setMessage(error.response.data.message || "Error booking ticket");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#fffff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Book a Ticket
      </Typography>

      <form onSubmit={handleBookTicket}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }} required>
          <InputLabel>Train</InputLabel>
          <Select
            value={selectedTrain}
            onChange={(e) => setSelectedTrain(e.target.value)}
            label="Train"
            fullWidth
          >
            <MenuItem value="">Select Train</MenuItem>
            {trains.map((train) => (
              <MenuItem key={train._id} value={train._id}>
                {train.name} - {train.route.start} to {train.route.end}
              </MenuItem>
            ))}
          </Select>
          {!selectedTrain && (
            <FormHelperText error>Select a train</FormHelperText>
          )}
        </FormControl>

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: "20px" }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Seat Number"
          type="number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: "20px" }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Book Ticket
        </Button>
      </form>

      {message && (
        <>
          <Typography
            variant="body1"
            sx={{ marginTop: "20px", textAlign: "center", color: "green" }}
          >
            {message}
          </Typography>
          {qrCode && (
            <Typography variant="body2" color="textSecondary">
              QR Code:
              <img
                src={qrCode}
                alt="QR Code"
                style={{
                  marginTop: "10px",
                  width: "100px",
                  height: "100px",
                }}
              />
            </Typography>
          )}
        </>
      )}
      {error && (
        <Typography
          variant="body1"
          sx={{ marginTop: "20px", textAlign: "center", color: "red" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TicketBookingScreen;

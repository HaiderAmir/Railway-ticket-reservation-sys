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
  const [price, setPrice] = useState(0);
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

  const handleTrainSelect = (trainId) => {
    setSelectedTrain(trainId);
    const train = trains.find((t) => t._id === trainId);
    setPrice(train?.pricePerSeat || 0);
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleBookTicket = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/payments/create-session`,
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

      window.location.href = data.url;
    } catch (error) {
      setMessage(error.response.data.message || "Error booking ticket");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
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
            onChange={(e) => handleTrainSelect(e.target.value)}
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

        {selectedTrain && (
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            Price per seat: Rs {price}
          </Typography>
        )}

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
          Proceed to Payment
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

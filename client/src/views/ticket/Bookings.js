import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { CANCELLED } from "../../constants";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setBookings(response.data);
    } catch (error) {
      setMessage("Error fetching bookings");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setMessage("Booking cancelled successfully.");
      fetchBookings();
    } catch (error) {
      setMessage("Error cancelling booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Box sx={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Your Bookings
      </Typography>

      {message && (
        <Typography variant="body1" sx={{ color: "red", marginBottom: "20px" }}>
          {message}
        </Typography>
      )}

      <Grid container spacing={1}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={booking._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {booking.train.name} - {booking.train.route.start} to{" "}
                    {booking.train.route.end}
                  </Typography>
                  <Typography variant="body1">Date: {booking.date}</Typography>
                  <Typography variant="body1">
                    Seat Number: {booking.seatNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    QR Code:
                    <img
                      src={booking.qrCode}
                      alt="QR Code"
                      style={{
                        marginTop: "10px",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </Typography>
                  {booking.status === CANCELLED && (
                    <Button
                      variant="contained"
                      disabled
                      sx={{ marginTop: "15px" }}
                    >
                      Booking Cancelled
                    </Button>
                  )}
                  {booking.status === "CONFIRMED" && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ marginTop: "15px" }}
                    >
                      Booking Confirmed
                    </Button>
                  )}
                  {booking.status === "BOOKED" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancelBooking(booking._id)}
                      sx={{ marginTop: "15px" }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No bookings found</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Bookings;

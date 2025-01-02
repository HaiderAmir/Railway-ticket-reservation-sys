import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/tickets/confirm-payment`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setTicket(data.ticket);
      } catch (err) {
        console.error("Payment confirmation failed:", err);
        setError(err.response.data);
      }
    };

    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId]);

  if (error) {
    console.log("Error:", error);

    return (
      <Box
        sx={{
          maxWidth: "900px",
          margin: "50px auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="error" sx={{ marginBottom: "20px" }}>
          {error.message} 😔
        </Typography>

        <Button variant="contained" color="primary" href="/book">
          Go Back
        </Button>
      </Box>
    );
  }

  if (!ticket) {
    return <p>Loading your ticket...</p>;
  }

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Payment Successful 🎉
      </Typography>
      {ticket && (
        <div key={ticket?._id}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Ticket Details:
          </Typography>
          <Typography variant="body1">Train: {ticket?.train?.name}</Typography>
          <Typography variant="body1">Date: {ticket?.date}</Typography>
          <Typography variant="body1">
            Seat Number: {ticket?.seatNumber}
          </Typography>

          {ticket?.qrCode && (
            <img
              src={ticket?.qrCode}
              alt="E-Ticket QR Code"
              style={{
                marginTop: "10px",
                width: "100px",
                height: "100px",
              }}
            />
          )}
        </div>
      )}
      <Button variant="contained" color="primary" href="/book">
        Go Back
      </Button>
    </Box>
  );
};

export default PaymentSuccess;

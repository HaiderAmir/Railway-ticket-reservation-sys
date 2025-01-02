import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PaymentFailure = () => {
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
        Payment Failed 😔
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Unfortunately, your payment could not be processed. Please try again or
        contact support for assistance.
      </Typography>
      <Button variant="contained" color="primary" href="/book">
        Try Again
      </Button>
    </Box>
  );
};

export default PaymentFailure;

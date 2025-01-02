import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
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
      <div style={{ textAlign: "center" }}>
        <h1>Page Not Found</h1>
        <p>This page doesn't exist.</p>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button variant="contained">Go Back to Home</Button>
        </Link>
      </div>
    </Box>
  );
};

export default NotFound;

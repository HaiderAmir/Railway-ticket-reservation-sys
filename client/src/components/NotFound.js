import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Page Not Found</h1>
      <p>This page doesn't exist.</p>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button variant="contained">Go Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;

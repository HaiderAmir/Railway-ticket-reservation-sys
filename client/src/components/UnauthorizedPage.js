import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button variant="contained">Go Back to Home</Button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        Railway Management System &copy; {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2">
        <Link color="inherit" underline="hover" sx={{ margin: "0 10px" }}>
          <RouterLink
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to="/terms"
          >
            Terms & Conditions
          </RouterLink>
        </Link>
        <Link color="inherit" underline="hover" sx={{ margin: "0 10px" }}>
          <RouterLink
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to="/privacy"
          >
            Privacy Policy
          </RouterLink>
        </Link>
        <Link color="inherit" underline="hover" sx={{ margin: "0 10px" }}>
          <RouterLink
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to="/contact"
          >
            Contact Us
          </RouterLink>
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

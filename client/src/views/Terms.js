import React from "react";
import { Box, Typography } from "@mui/material";

const Terms = () => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px", color: "#1976d2" }}
      >
        Terms and Conditions
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>1. Introduction</strong>
        <br />
        Welcome to the Railway Management System. By accessing or using our
        services, you agree to comply with and be bound by these Terms and
        Conditions. If you do not agree with these terms, please do not use our
        services.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>2. User Registration</strong>
        <br />
        You must register for an account to use our services. You are
        responsible for maintaining the confidentiality of your account
        credentials and agree to notify us immediately of any unauthorized use
        of your account.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>3. Use of Service</strong>
        <br />
        Our services are provided for lawful purposes only. You agree not to use
        our system for any illegal or prohibited activities.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>4. Limitation of Liability</strong>
        <br />
        We are not liable for any damages or losses arising from the use or
        inability to use our service, including any errors or inaccuracies in
        content.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>5. Modifications</strong>
        <br />
        We may modify these Terms and Conditions at any time. Any changes will
        be effective immediately upon posting on the website.
      </Typography>
    </Box>
  );
};

export default Terms;

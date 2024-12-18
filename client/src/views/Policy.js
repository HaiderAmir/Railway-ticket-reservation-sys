import React from "react";
import { Box, Typography } from "@mui/material";

const Policy = () => {
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
        Privacy Policy
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>1. Introduction</strong>
        <br />
        We respect your privacy and are committed to protecting the personal
        information you share with us. This Privacy Policy outlines the
        information we collect, how we use it, and your rights regarding your
        personal data.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>2. Information We Collect</strong>
        <br />
        We collect personal information such as your name, email address, and
        feedback to improve our service. We also collect usage data to enhance
        the user experience.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>3. How We Use Your Information</strong>
        <br />
        We use the information to provide, maintain, and improve our services,
        including customer support and communication regarding your account or
        service updates.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>4. Data Security</strong>
        <br />
        We implement security measures to protect your personal information.
        However, we cannot guarantee complete security due to the inherent
        nature of the internet.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>5. Your Rights</strong>
        <br />
        You have the right to access, update, or delete your personal data. You
        can also opt-out of certain data collection practices.
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: "1.6", marginBottom: "20px" }}
      >
        <strong>6. Changes to This Privacy Policy</strong>
        <br />
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </Typography>
    </Box>
  );
};

export default Policy;

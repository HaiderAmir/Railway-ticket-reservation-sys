import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN, USER } from "../../constants";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(response.data));
        setSuccess("Login successful!");

        if (role === USER) {
          navigate("/my-bookings");
        } else if (role === ADMIN) {
          navigate("/admin/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: "20px" }}
        >
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "15px" }}
        >
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "10px" }}
        >
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;

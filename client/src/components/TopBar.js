import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ADMIN, USER } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Railway Management System
          </Link>
        </Typography>

        {role === USER && (
          <>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/book"
            >
              <Button color="inherit">Book Ticket</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/my-bookings"
            >
              <Button color="inherit">My Bookings</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/profile"
            >
              <Button color="inherit">Profile</Button>
            </Link>
          </>
        )}
        {role === ADMIN && (
          <>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/dashboard"
            >
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/manage-bookings"
            >
              <Button color="inherit">Bookings</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/manage-trains"
            >
              <Button color="inherit">Trains</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/manage-routes"
            >
              <Button color="inherit">Routes</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/feedbacks"
            >
              <Button color="inherit">Feedbacks</Button>
            </Link>
          </>
        )}

        {role ? (
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/signup"
            >
              <Button variant="contained" href="/login">
                Sign Up
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/login"
            >
              <Button variant="contained" href="/login">
                Login
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

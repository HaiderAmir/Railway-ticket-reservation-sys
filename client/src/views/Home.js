import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { ADMIN, USER } from "../constants";
import { Link } from "react-router-dom";

const Home = () => {
  const [routes, setRoutes] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/routes`
        );
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    };
    fetchRoutes();
  }, []);

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
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Welcome to the Railway Management System
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          Book your tickets, manage schedules, and track your journeys
          seamlessly.
        </Typography>
        <Link
          style={{ textDecoration: "none" }}
          to={role === USER ? "/my-bookings" : "/admin/dashboard"}
        >
          <Button variant="contained" color="primary" size="large">
            {role === USER ? "View Bookings" : "Go to Admin Dashboard"}
          </Button>
        </Link>
      </Paper>

      <Typography
        variant="h5"
        style={{ marginTop: "30px", fontWeight: "bold", textAlign: "center" }}
      >
        Key Features
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: "15px", textAlign: "center" }}>
            <Typography variant="h6">Search Trains</Typography>
            <Typography variant="body2">
              Quickly find trains by route, date, and time.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: "15px", textAlign: "center" }}>
            <Typography variant="h6">Book Tickets</Typography>
            <Typography variant="body2">
              Reserve your seats and receive an e-ticket instantly.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: "15px", textAlign: "center" }}>
            <Typography variant="h6">Admin Tools</Typography>
            <Typography variant="body2">
              Manage schedules, routes, and analyze performance.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {role === USER && (
        <Grid
          container
          spacing={3}
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/book"
            >
              Book now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/profile"
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
      )}
      {role === ADMIN && (
        <Grid
          container
          spacing={3}
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/admin/manage-trains"
            >
              Manage Trains
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/admin/manage-routes"
            >
              Manage Routes
            </Button>
          </Grid>
        </Grid>
      )}

      <>
        <Typography
          variant="h5"
          style={{ marginTop: "30px", fontWeight: "bold", textAlign: "center" }}
        >
          Available Routes
        </Typography>
        {routes.length > 0 ? (
          <Table style={{ marginTop: "20px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Route Name</TableCell>
                <TableCell>Train</TableCell>
                <TableCell>Stops</TableCell>
                <TableCell>Total Distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route._id}>
                  <TableCell>{route.routeName}</TableCell>
                  <TableCell>{route.trainId?.name || "N/A"}</TableCell>
                  <TableCell>
                    {route.stops.map((stop) => stop.stationName).join(", ")}
                  </TableCell>
                  <TableCell>{route.totalDistance} km</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography
            variant="body1"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            No routes available at the moment.
          </Typography>
        )}
      </>
    </Box>
  );
};

export default Home;

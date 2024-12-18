import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: analyticsData } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/analytics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const { data: reportsData } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/reports`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setAnalytics(analyticsData);
        setReports(reportsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching admin data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">Overview</Typography>
          <Typography>Active Users: {analytics.userCount}</Typography>
          <Typography>Total Trains: {analytics.trainCount}</Typography>
          <Typography>Total Bookings: {analytics.bookingCount}</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Booking Reports
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report._id}>
                  <TableCell>{report._id}</TableCell>
                  <TableCell>{report.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Select,
  MenuItem,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { BOOKED, CANCELLED, CONFIRMED } from "../../../constants";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setTickets(response.data);
    } catch (err) {
      setError("Failed to fetch tickets.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Ticket status updated successfully!");
      fetchTickets();
    } catch (err) {
      setError("Failed to update ticket status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Ticket deleted successfully!");
      fetchTickets();
    } catch (err) {
      setError("Failed to delete ticket.");
    }
  };

  return (
    <Container
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Booking Management
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Train</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Seat Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.user.name}</TableCell>
                <TableCell>{ticket.train.name}</TableCell>
                <TableCell>
                  {new Date(ticket.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{ticket.seatNumber}</TableCell>
                <TableCell>{ticket.amount}</TableCell>
                <TableCell>
                  <Select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket._id, e.target.value)
                    }
                  >
                    <MenuItem value={BOOKED}>Booked</MenuItem>
                    <MenuItem value={CONFIRMED}>Confirmed</MenuItem>
                    <MenuItem value={CANCELLED}>Cancelled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(ticket._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default TicketManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [form, setForm] = useState({
    trainID: "",
    name: "",
    route: { start: "", end: "", stops: [] },
    timings: { departure: "", arrival: "" },
    capacity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [editing, setEditing] = useState(false);
  const [selectedTrainId, setSelectedTrainId] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/trains`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setTrains(data);
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Error fetching trains",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editing
      ? `${process.env.REACT_APP_BACKEND_URL}/trains/${selectedTrainId}`
      : `${process.env.REACT_APP_BACKEND_URL}/trains`;

    const method = editing ? "PUT" : "POST";

    try {
      const { data } = await axios({
        method,
        url,
        data: form,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (editing) {
        setTrains(
          trains.map((train) => (train._id === selectedTrainId ? data : train))
        );
      } else {
        setTrains([...trains, data]);
      }

      setForm({
        trainID: "",
        name: "",
        route: { start: "", end: "", stops: [] },
        timings: { departure: "", arrival: "" },
        capacity: 0,
      });
      setEditing(false);
      setSelectedTrainId(null);

      setSnackbar({
        open: true,
        message: editing
          ? "Train updated successfully"
          : "Train added successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving train",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrain = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/trains/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setTrains(trains.filter((train) => train._id !== id));
      setSnackbar({
        open: true,
        message: "Train deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting train",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditTrain = (train) => {
    setForm({
      trainID: train.trainID,
      name: train.name,
      route: {
        start: train.route.start,
        end: train.route.end,
        stops: train.route.stops,
      },
      timings: {
        departure: train.timings.departure,
        arrival: train.timings.arrival,
      },
      capacity: train.capacity,
    });
    setEditing(true);
    setSelectedTrainId(train._id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Train Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          label="Train ID"
          variant="outlined"
          fullWidth
          value={form.trainID}
          onChange={(e) => setForm({ ...form, trainID: e.target.value })}
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Train Name"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Route Start"
          variant="outlined"
          fullWidth
          value={form.route.start}
          onChange={(e) =>
            setForm({
              ...form,
              route: { ...form.route, start: e.target.value },
            })
          }
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Route End"
          variant="outlined"
          fullWidth
          value={form.route.end}
          onChange={(e) =>
            setForm({
              ...form,
              route: { ...form.route, end: e.target.value },
            })
          }
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Stops (comma separated)"
          variant="outlined"
          fullWidth
          value={form.route.stops.join(",")}
          onChange={(e) =>
            setForm({
              ...form,
              route: { ...form.route, stops: e.target.value.split(",") },
            })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Departure Time"
          variant="outlined"
          fullWidth
          type="time"
          value={form.timings.departure}
          onChange={(e) =>
            setForm({
              ...form,
              timings: { ...form.timings, departure: e.target.value },
            })
          }
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Arrival Time"
          variant="outlined"
          fullWidth
          type="time"
          value={form.timings.arrival}
          onChange={(e) =>
            setForm({
              ...form,
              timings: { ...form.timings, arrival: e.target.value },
            })
          }
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Capacity"
          variant="outlined"
          fullWidth
          type="number"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {loading ? (
            <CircularProgress size={24} />
          ) : editing ? (
            "Update Train"
          ) : (
            "Add Train"
          )}
        </Button>
      </form>

      <div>
        <h3>Existing Trains</h3>
        <ul>
          {trains.map((train) => (
            <li key={train._id}>
              <strong>{train.name}</strong> - {train.route.start} to{" "}
              {train.route.end}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteTrain(train._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditTrain(train)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TrainManagement;

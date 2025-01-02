import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TableBody,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Container,
} from "@mui/material";

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    trainId: "",
    stops: [{ stationName: "", arrivalTime: "", departureTime: "" }],
    totalDistance: "",
    routeName: "",
  });

  const handleStopsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStops = [...newRoute.stops];
    updatedStops[index][name] = value;
    setNewRoute({ ...newRoute, stops: updatedStops });
  };

  const handleAddStop = () => {
    setNewRoute({
      ...newRoute,
      stops: [
        ...newRoute.stops,
        { stationName: "", arrivalTime: "", departureTime: "" },
      ],
    });
  };

  const handleRemoveStop = (index) => {
    const updatedStops = newRoute.stops.filter((_, i) => i !== index);
    setNewRoute({ ...newRoute, stops: updatedStops });
  };

  const [selectedTrain, setSelectedTrain] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [editRouteId, setEditRouteId] = useState(null);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/routes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
      setSnackbar({
        open: true,
        message: "Error fetching routes",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoute = async () => {
    if (
      !newRoute.trainId ||
      !newRoute.routeName ||
      !newRoute.totalDistance ||
      newRoute.stops.length === 0
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "warning",
      });
      return;
    }

    const routeData = { ...newRoute, trainId: selectedTrain };

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/routes`,
        routeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRoutes([...routes, data]);
      setNewRoute({ trainId: "", stops: [], totalDistance: "", routeName: "" });
      setSelectedTrain("");
      setSnackbar({
        open: true,
        message: "Route added successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding route:", error);
      setSnackbar({
        open: true,
        message: "Error adding route",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoute = async () => {
    if (
      !newRoute.trainId ||
      !newRoute.routeName ||
      !newRoute.totalDistance ||
      newRoute.stops.length === 0
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "warning",
      });
      return;
    }

    const routeData = { ...newRoute, trainId: selectedTrain };

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/routes/${editRouteId}`,
        routeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRoutes(
        routes.map((route) => (route._id === editRouteId ? data : route))
      );
      setEditing(false);
      setEditRouteId(null);
      setNewRoute({ trainId: "", stops: [], totalDistance: "", routeName: "" });
      setSelectedTrain("");
      setSnackbar({
        open: true,
        message: "Route updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating route:", error);
      setSnackbar({
        open: true,
        message: "Error updating route",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/routes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setRoutes(routes.filter((route) => route._id !== id));
      setSnackbar({
        open: true,
        message: "Route deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting route:", error);
      setSnackbar({
        open: true,
        message: "Error deleting route",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
  };

  const handleEditButtonClick = (route) => {
    setEditing(true);
    setEditRouteId(route._id);
    setNewRoute({
      trainId: route.trainId,
      stops: route.stops,
      totalDistance: route.totalDistance,
      routeName: route.routeName,
    });
  };

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
    fetchRoutes();
  }, []);

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
      <h1>Route Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>{editing ? "Edit Route" : "Add New Route"}</h2>

        <TextField
          label="Route Name"
          variant="outlined"
          fullWidth
          name="routeName"
          value={newRoute.routeName}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />

        <FormControl fullWidth sx={{ marginBottom: "20px" }} required>
          <InputLabel>Train</InputLabel>
          <Select
            value={selectedTrain}
            onChange={(e) => {
              setNewRoute({ ...newRoute, trainId: e.target.value });
              setSelectedTrain(e.target.value);
            }}
            label="Train"
            fullWidth
          >
            <MenuItem value="">Select Train</MenuItem>
            {trains.map((train) => (
              <MenuItem key={train._id} value={train._id}>
                {train.name} - {train.route.start} to {train.route.end}
              </MenuItem>
            ))}
          </Select>
          {!selectedTrain && (
            <FormHelperText error>Select a train</FormHelperText>
          )}
        </FormControl>

        <div>
          <h3>Stops</h3>
          {newRoute.stops.map((stop, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <TextField
                label="Station Name"
                variant="outlined"
                fullWidth
                name="stationName"
                value={stop.stationName}
                onChange={(e) => handleStopsChange(index, e)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Arrival Time"
                variant="outlined"
                fullWidth
                name="arrivalTime"
                value={stop.arrivalTime}
                onChange={(e) => handleStopsChange(index, e)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Departure Time"
                variant="outlined"
                fullWidth
                name="departureTime"
                value={stop.departureTime}
                onChange={(e) => handleStopsChange(index, e)}
                style={{ marginBottom: "10px" }}
              />
              <Button
                onClick={() => handleRemoveStop(index)}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px" }}
              >
                Remove Stop
              </Button>
            </div>
          ))}
          <Button
            onClick={handleAddStop}
            variant="outlined"
            color="primary"
            style={{ marginBottom: "20px" }}
          >
            Add Stop
          </Button>
        </div>

        <TextField
          label="Total Distance (km)"
          variant="outlined"
          fullWidth
          type="number"
          name="totalDistance"
          value={newRoute.totalDistance}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />

        <Button
          onClick={editing ? handleEditRoute : handleAddRoute}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : editing ? (
            "Update Route"
          ) : (
            "Add Route"
          )}
        </Button>
      </div>

      <div>
        <h2>Existing Routes</h2>
        {loading && <CircularProgress />}
        {!loading && routes.length === 0 && <p>No routes available</p>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route Name</TableCell>
              <TableCell>Train</TableCell>
              <TableCell>Stops</TableCell>
              <TableCell>Total Distance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route._id}>
                <TableCell>{route.routeName}</TableCell>
                <TableCell>{route.trainId?.name}</TableCell>

                <TableCell>
                  {route.stops.map((stop, index) => (
                    <div key={index}>
                      {stop.stationName} (Arrival: {stop.arrivalTime},
                      Departure: {stop.departureTime})
                    </div>
                  ))}
                </TableCell>

                <TableCell>{route.totalDistance} km</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditButtonClick(route)}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteRoute(route._id)}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </Container>
  );
};

export default RouteManagement;

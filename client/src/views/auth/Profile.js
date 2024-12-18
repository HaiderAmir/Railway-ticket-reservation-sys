import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setMessage("Error fetching user details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/auth/update`,
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Profile
      </Typography>

      {message && (
        <Typography variant="body1" sx={{ color: "red" }}>
          {message}
        </Typography>
      )}

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editMode}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!editMode}
          />

          {editMode ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              onClick={() => handleSaveChanges()}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: "20px" }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;

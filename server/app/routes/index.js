module.exports = (app) => {
  app.get("/api/status", (req, res) => {
    res.status(200).send("backend app working.");
  });
  app.use("/api/auth", require("./authRoutes"));
  app.use("/api/trains", require("./trainRoutes"));
  app.use("/api/tickets", require("./ticketRoutes"));
  app.use("/api/admin", require("./adminRoutes"));
  app.use("/api/routes", require("./routeRoutes"));
  app.use("/api/feedbacks", require("./feedbackRoutes"));

  // 404 route
  app.use("*", (req, res) => {
    res.status(404).send("Route not found!");
  });
};

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./views/auth/SignUp";
import Login from "./views/auth/Login";
import TicketBookingScreen from "./views/ticket/TicketBookingScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";
import TopBar from "./components/TopBar";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Footer from "./components/Footer";
import { ADMIN, USER } from "./constants";
import Contact from "./views/Contact";
import Terms from "./views/Terms";
import Policy from "./views/Policy";
import Bookings from "./views/ticket/Bookings";
import Profile from "./views/auth/Profile";
import NotFound from "./components/NotFound";
import TrainManagement from "./views/admin/train/TrainManagement";
import RouteManagement from "./views/admin/route/RouteManagement";
import AdminDashboard from "./views/admin/AdminDashboard";
import FeedbackManagement from "./views/admin/FeedbackManagement";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import TicketManagement from "./views/admin/ticket/TicketManagement";
import PaymentSuccess from "./views/ticket/PaymentSuccess";
import PaymentFailure from "./views/ticket/PaymentFailure";

const App = () => {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute allowedRoles={[USER]} />}>
            <Route path="/book" element={<TicketBookingScreen />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/my-bookings" element={<Bookings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/feedbacks" element={<FeedbackManagement />} />
            <Route path="/admin/manage-trains" element={<TrainManagement />} />
            <Route
              path="/admin/manage-bookings"
              element={<TicketManagement />}
            />
            <Route path="/admin/manage-routes" element={<RouteManagement />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

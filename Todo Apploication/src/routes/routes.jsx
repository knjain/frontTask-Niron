import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./protectedRoutes";

const AppRoutes = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Routes>
      {/* If user is already logged in, redirect to Dashboard */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

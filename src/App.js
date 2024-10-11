import "./App.css";
// import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { ThemeProvider, useTheme } from "./components/ThemeContext"; // Import the theme context
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MyProfile from "./components/MyProfile/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import UserProfileWrapper from "./components/UserWrapperProfile/UserWrapperProfile";

const AppContent = () => (
  <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <ProtectedRoute>
            <UserProfileWrapper />
          </ProtectedRoute>
        }
      />
      <Route path="/bad-path" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/bad-path" replace />} />
    </Routes>
  </>
);

const App = () => <AppContent />;

export default App;
